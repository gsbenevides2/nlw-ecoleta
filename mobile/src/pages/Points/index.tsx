import React from 'react'
import {
 View,
 Text,
 Image,
 ScrollView,
 TouchableOpacity,
 Alert
} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import styles from './styles'
import {useNavigation,useRoute} from '@react-navigation/native'
import MapView , {Marker} from 'react-native-maps'
import api from '../../services/api'
import {SvgUri} from 'react-native-svg'
import * as Location from 'expo-location'
interface Item {
 id: number;
 title: string;
 image_url: string;
}
interface Point {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  image_url: string;
}
interface Params {
 city:string;
 uf:string;
}
const Points = ()=>{
 const [selectedItems, setSelectedItems] = React.useState<number[]>([])
 const navigation = useNavigation()
 const route = useRoute()

 const params = route.params as Params
 function handleNavigateBack(){
	navigation.goBack()
 }
 function handleNavigateToDetail(point_id:number) {
	navigation.navigate("Detail",{point_id})
 }
 const [initialPosition, setInitialPosition] = React.useState<[number, number]>([0,0])
 React.useEffect(()=>{
	async function loadLocation(){
	 const {status} = await Location.requestPermissionsAsync()

	 if(status !== 'granted'){
		Alert.alert(
		 "Ooooops...",
		 "Precisamos de sua permissão para obter a localização"
		)
		return
	 }
	 const location = await Location.getCurrentPositionAsync()

	 const { latitude, longitude } = location.coords
	 setInitialPosition([latitude, longitude])
	}
	loadLocation()
 },[])
 const [points,setPoints] = React.useState<Point[]>([])
 React.useEffect(()=>{
	api.get('/points',{
	 params:{
		city:params.city,
		uf:params.uf,
		items:selectedItems
	 }
	}).then(response=>{
	 setPoints(response.data)
	})
 },[selectedItems])
 const [items,setItems] = React.useState<Item[]>([])
 React.useEffect(()=>{
	api.get('/items').then(response=>{
	 setItems(response.data)
	})
 },[])
 function handleSelectItem(id:number){
	const alredySelected = selectedItems.includes(id)

	if(alredySelected){
	 const filtredItems = selectedItems.filter(itemId => itemId!== id)
	 setSelectedItems(filtredItems)
	}
	else setSelectedItems([...selectedItems,id])
 }
 return (
	<>
	 <View style={styles.container}>
		<TouchableOpacity onPress={handleNavigateBack}>
		 <Icon name="arrow-left" size={20} color="#34cb79" />
		</TouchableOpacity>
		<Text style={styles.title}>Bem vindo.</Text>
		<Text style={styles.description}>
		 Encontre no mapa um ponto de coleta.
		</Text>

		<View style={styles.mapContainer}>
		 {initialPosition[0] !== 0 &&
		 <MapView
			style={styles.map}
			initialRegion={{
			 latitude:initialPosition[0],
				longitude:initialPosition[1],
				latitudeDelta:0.014,
				longitudeDelta:0.014
			}}>
			 {points.map(point=>(
				<Marker
				 key={String(point.id)}
				 onPress={()=>handleNavigateToDetail(point.id)}
				style={styles.mapMarker}
				coordinate={{
				 latitude:point.latitude,
					longitude:point.longitude,
				}}>
				 <View style={styles.mapMarkerContainer}>
					<Image source={{uri:point.image_url}} style={styles.mapMarkerImage}/>
					<View>
					 <Text  style={styles.mapMarkerTitle}>{point.name}</Text>
					</View>
				 </View>
				</Marker>
			))}
			 </MapView>
			}
		 </View>
		</View>
		<View style={styles.itemsContainer}>
		 <ScrollView
			contentContainerStyle={{
			 paddingHorizontal: 32,
			}}
			horizontal
			showsHorizontalScrollIndicator={false}
		 >
			{items.map((item) => (
			 <TouchableOpacity
				key={String(item.id)}
				style={[
				 styles.item,
				 selectedItems.includes(item.id) ? styles.selectedItem : {},
				]}
				onPress={() => handleSelectItem(item.id)}
				activeOpacity={0.6}
			 >
				<SvgUri width={42} height={42} uri={item.image_url} />
				<Text style={styles.itemTitle}>{item.title}</Text>
			 </TouchableOpacity>
		 ))}
		</ScrollView>
	 </View>
	</>
 )
}

export default Points
