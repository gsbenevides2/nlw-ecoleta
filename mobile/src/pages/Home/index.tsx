import React from 'react'
import {
 View,
 Image,
 Text,
 ImageBackground
} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import {RectButton} from 'react-native-gesture-handler'
import styles ,{defaultStyles} from './styles'
import RNPickerSelect	 from 'react-native-picker-select'
import places from '../../services/places'

import {useNavigation} from '@react-navigation/native'

interface IBGEUFResponse {
 sigla: string
}
interface IBGECityResponse {
 nome:string
}
const Home = ()=>{
 const [selectedUf,setSelectedUf] = React.useState('')
 const [selectedCity,setSelectedCity] = React.useState('')
 const navigation = useNavigation()
 function handleNavigateToPoints(){
	navigation.navigate('Points',{
	 city:selectedCity,
	 uf:selectedUf
	})
 }
 const [ufs,setUfs] = React.useState<string[]>([])
 React.useEffect(()=>{
	places.get<IBGEUFResponse[]>(`/estados`)
	 .then(response=>{
		const ufInitials = response.data.map(uf=>uf.sigla)
		setUfs(ufInitials)
	 })
 },[])

 const [cities,setCities] = React.useState<string[]>([])
 function handleSelectUf(uf:string){
	setSelectedUf(uf)
 }
 React.useEffect(()=>{
	if(selectedUf !== ''){
	 places.get<IBGECityResponse[]>(`/estados/${selectedUf}/municipios`)
		.then(response=>{
		 const citiesNames = response.data.map(city=>city.nome)
		 setCities(citiesNames)
		})
	}
 },[selectedUf])
 function handleSelectCity(city:string){
	setSelectedCity(city)
 }

 return (
	<ImageBackground
	 source={require('../../assets/home-background.png')}
	 style={styles.container}
	 imageStyle={{
		width:274,
		 height:368
	 }}>
		<View style={styles.main}>
		 <Image source={require('../../assets/logo.png')}/>
		 <View>
			<Text style={styles.title}>
			 Seu marketplace de coleta de resíduos
			</Text>
			<Text style={styles.description}>
			 Ajudamos pessoas a encontrarem pontos de coleta de forma
			 eficiente.
			</Text>
		 </View>
		</View>
		<View style={styles.footer}>
		 <RNPickerSelect
			placeholder={{
			 label:'Selecione um estado:(UF)',
				value:''
			}}
			style={{
			 ...defaultStyles,			
				viewContainer:styles.select,
				inputAndroid:styles.input
			}}
			onValueChange={handleSelectUf}
			items={ufs.map(uf=>{
			 return{
				label:uf, 
				value: uf 
			 }
			})}/>
		 <RNPickerSelect
			placeholder={{
			 label:'Selecione uma cidade:',
			 value:''
			}}
			style={{
			 ...defaultStyles,			
				viewContainer:styles.select,
				inputAndroid:styles.input
			}}
			onValueChange={handleSelectCity}
			items={cities.map(city=>{
			 return{
				label:city, 
				value: city 
			 }
			})}/>
		 <RectButton
			enabled={
			 selectedCity !== '' && selectedUf !== ''
			}
			style={[
			 styles.button,
			 selectedCity !== '' && selectedUf !== ''? null : styles.buttonDisabled
			]}
			onPress={handleNavigateToPoints}>
			<View style={styles.buttonIcon}>
			 <Icon name="arrow-right" color="#fff" size={24} />
			</View>
			<Text style={styles.buttonText}>Entrar</Text>
		 </RectButton>
		</View>
	 </ImageBackground>
	)
}

export default Home
