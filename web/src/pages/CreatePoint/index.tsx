import React ,{ChangeEvent,FormEvent} from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {
 Map,TileLayer,Marker
} from 'react-leaflet'
import logo from '../../assets/logo.svg'
import './styles.css'
import api from '../../services/api'
import places from '../../services/places'
import {LeafletMouseEvent} from 'leaflet'
import Dropzone from '../../components/Dropzone'
import Success from '../../components/Success'

interface Item {
 id: number
 title: string
 image_url: string
}
interface IBGEUFResponse {
 sigla: string
}
interface IBGECityResponse {
 nome:string
}
const CreatePoint = ()=>{
 const [selectedFile,setSelectedFile] = React.useState<File>()
 const [success,setSuccess] = React.useState(false)
 const [inputsData, setInputsData] = React.useState({
	name:'',
	whatsapp:'',
	email:''
 })
 function handleInputChange(event:ChangeEvent<HTMLInputElement>){
	const {name,value} = event.target
	setInputsData({
	 ...inputsData,
	 [name]:value
	})
 }

 const [initialPosition,setInitialPosition] = React.useState<[number,number]>([0,0])
 React.useEffect(()=>{
	navigator.geolocation.getCurrentPosition(position=>{
	 const {latitude,longitude} = position.coords
	 setInitialPosition([latitude,longitude])
	})
 },[])

 const [selectedPosition,setSelectedPosition] = React.useState<[number,number]>([0,0])
 function handleMapClick(event:LeafletMouseEvent){
	const {
	 lat:latitude,
	 lng:longitude
	} = event.latlng
	setSelectedPosition([latitude,longitude])
 }

 const [ufs,setUfs] = React.useState<string[]>([])
 React.useEffect(()=>{
	places.get<IBGEUFResponse[]>(`/estados`)
	 .then(response=>{
		const ufInitials = response.data.map(uf=>uf.sigla)
		setUfs(ufInitials)
	 })
 },[])

 const [selectedUf,setSelectedUf] = React.useState('0')
 const [cities,setCities] = React.useState<string[]>([])
 function handleSelectUf(event:ChangeEvent<HTMLSelectElement>){
	setSelectedUf(event.target.value)
 }
 React.useEffect(()=>{
	if(selectedUf !== '0'){
	 places.get<IBGECityResponse[]>(`/estados/${selectedUf}/municipios`)
		.then(response=>{
		 const citiesNames = response.data.map(city=>city.nome)
		 setCities(citiesNames)
		})
	}
 },[selectedUf])

 const [selectedCity,setSelectedCity] = React.useState('0')
 function handleSelectCity(event:ChangeEvent<HTMLSelectElement>){
	setSelectedCity(event.target.value)
 }

 const [items,setItems] = React.useState<Item[]>([])
 React.useEffect(()=>{
	api.get('/items')
	 .then(response=>{
		setItems(response.data)
	 })
 },[])

 const [selectedItems, setSelectedItems] = React.useState<number[]>([])
 function handleItemClick(id:number){
	const alredySelected = selectedItems.includes(id)

	if(alredySelected){
	 const filtredItems = selectedItems.filter(itemId => itemId!== id)
	 setSelectedItems(filtredItems)
	}
	else setSelectedItems([...selectedItems,id])
 }
 function handleSubmit(event:FormEvent){
	event.preventDefault()
	const {name,email,whatsapp} = inputsData
	const [latitude,longitude] = selectedPosition
	const uf = selectedUf
	const city = selectedCity
	const items = selectedItems
	const data = new FormData()
	data.append('name',name)
	data.append('email',email)
	data.append('whatsapp',whatsapp)
	data.append('latitude',String(latitude))
	data.append('longitude',String(longitude))
	data.append('uf',uf)
	data.append('city',city)
	data.append('items',items.join(','))
	if(selectedFile){
	 data.append('image',selectedFile)
	}
	api.post('points',data)
	 .then(()=>{
		setSuccess(true)
	 })
	 .catch(()=>{
		alert('Ops deu um erro! Verifique o formulário.')
	 })
 }
 return(
	<>
	 <div id="page-create-point">
		<header>
		 <img src={logo} alt="Ecoleta" />
		 <Link to='/'>
			<FiArrowLeft />
			Voltar para home
		 </Link>
		</header>
		<form onSubmit={handleSubmit}>
		 <h1>Cadastro do<br/>Ponto de Coleta</h1>
<Dropzone onFileUploaded={setSelectedFile} />

		 <fieldset>
			<legend>
			 <h2>Dados</h2>
			</legend>
			<div className="field">
			 <label htmlFor="name">Nome da entidade</label>
			 <input onChange={handleInputChange} name="name" type="text" id="name"/>
			</div>
			<div className="field-group">
			 <div className="field">
				<label htmlFor="email">E-mail</label>
				<input onChange={handleInputChange} name="email" type="email" id='email' />
			 </div>
			 <div className="field">
				<label htmlFor="whatsapp">Whatsapp</label>
				<input onChange={handleInputChange} name="whatsapp" type="text" id='whatsapp' />
			 </div>
			</div>
		 </fieldset>

		 <fieldset>
			<legend>
			 <h2>Endereço</h2>
			 <span>Selecione um ponto no mapa</span>
			</legend>
			<Map center={initialPosition} zoom={15} onClick={handleMapClick}>
			 <TileLayer attribution={'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
			 <Marker position={selectedPosition} />
			</Map>
			<div className="field-group">
			 <div className="field">
				<label htmlFor="uf">Estado (UF)</label>
				<select id="uf" name="uf" value={selectedUf} onChange={handleSelectUf}>
				 <option value="0">Selecione um estado</option>
				 {ufs.map(uf=>(
					<option key={uf} value={uf}>{uf}</option>
				 ))}
				</select>
			 </div>
			 <div className="field">
				<label htmlFor="city">Cidade</label>
				<select id="city" name="city" value={selectedCity} onChange={handleSelectCity}>
				 <option value="0">Selecione uma cidade</option>
				 {cities.map(city=>(
					<option key={city} value={city}>{city}</option>
				 ))}
				</select>
			 </div>
			</div>
		 </fieldset>

		 <fieldset>
			<legend>
			 <h2>Items de Coleta</h2>
			 <span>Selecione um ou mais items abaixo</span>
			</legend>
			<ul className="items-grid">
			 {items.map(item=>(
				<li key={item.id} 
				 className={selectedItems.includes(item.id)?'selected':''}
				 onClick={()=>handleItemClick(item.id)}>
				 <img src={item.image_url} alt={item.title} />
				 <span>{item.title}</span>
				</li>
			))}
		 </ul>
		</fieldset>
		<button type="submit">Cadastrar ponto de coleta</button>
	 </form>
	</div>
	<Success visible={success}/>
 </>
 )
}

export default CreatePoint
