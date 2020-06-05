import React from 'react'
import {
 View,
 SafeAreaView,
 Image,
 TouchableOpacity,
 Text,
 Linking
} from 'react-native'
import {useNavigation,useRoute} from '@react-navigation/native'
import {Feather as Icon,FontAwesome} from '@expo/vector-icons'
import {RectButton} from 'react-native-gesture-handler'
import styles from './styles'
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'
interface Data {
 point: {
	image: string;
	name: string;
	email: string;
	whatsapp: string;
	city: string;
	uf: string;
 };
 items: {
	title: string;
 }[];
}

interface Params {
 point_id:number
}
const Detail = ()=>{
 const [data, setData] = React.useState<Data>({} as Data)
 const route = useRoute()
 const params = route.params as Params

 const navigation = useNavigation()
 function handleNavigateBack(){
	navigation.goBack()
 }
 function handleComposeMail(){
	MailComposer.composeAsync({
	 subject: "Interesse na coleta de resíduos",
	 recipients: [data.point.email],
	})
 }
 function handleWhatsApp(){
	Linking.openURL(
	 `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interresse na coleta de residuos`
	)
 }

 React.useEffect(()=>{
	api.get(`/points/${params.point_id}`)
	 .then(response=>{
		setData(response.data)
	 })

 },[])
 if(!data.point){
	return <View/>
 }
 return (
	<SafeAreaView style={{ flex: 1 }}>
	 <View style={styles.container}>
		<TouchableOpacity onPress={handleNavigateBack}>
		 <Icon name="arrow-left" size={20} color="#34cb79" />
		</TouchableOpacity>

		<Image
	style={styles.pointImage}
	source={{
	 uri: 'https://picsum.photos/300/200'
	}}
	/>

 <Text style={styles.pointName}>{data.point.name}</Text>
 <Text style={styles.pointItems}>
	{data.items.map((item) => item.title).join(", ")}
 </Text>

 <View style={styles.address}>
	<Text style={styles.addressTitle}>Endereço</Text>
	<Text style={styles.addressContent}>
	{data.point.city}, {data.point.uf}
 </Text>
</View>
	</View>
	<View style={styles.footer}>
	 <RectButton style={styles.button} onPress={handleWhatsApp}>
		<FontAwesome name="whatsapp" size={20} color="#fff" />
		<Text style={styles.buttonText}>Whatsapp</Text>
	 </RectButton>
	 <RectButton style={styles.button} onPress={() => handleComposeMail()}>
		<Icon name="mail" size={20} color="#fff" />
		<Text style={styles.buttonText}>E-mail</Text>
	 </RectButton>
	</View>
 </SafeAreaView>
)
}

export default Detail
