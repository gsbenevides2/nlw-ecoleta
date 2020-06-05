import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/Home'
import Points from './pages/Points'
import Detail  from './pages/Detail'

const AppStack = createStackNavigator()

const Routes = ()=>{
 return(
	<NavigationContainer>
	 <AppStack.Navigator 
		screenOptions={{
		 cardStyle:{
			backgroundColor:'#f0f0f5'
		 }
		}}
		headerMode='none'>
		<AppStack.Screen name='Home' component={Home}/>
		<AppStack.Screen name='Points' component={Points}/>
		<AppStack.Screen name='Detail' component={Detail}/>
	 </AppStack.Navigator>
	</NavigationContainer>
 )
}

export default Routes
 