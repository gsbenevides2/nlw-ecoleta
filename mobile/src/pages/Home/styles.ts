import {StyleSheet} from 'react-native'

export default StyleSheet.create({
 container: {
	flex: 1,
	padding: 32,
 },

 main: {
	flex: 1,
	justifyContent: 'center',
 },

 title: {
	color: '#322153',
	fontSize: 32,
	fontFamily: 'Ubuntu_700Bold',
	maxWidth: 260,
	marginTop: 64,
 },

 description: {
	color: '#6C6C80',
	fontSize: 16,
	marginTop: 16,
	fontFamily: 'Roboto_400Regular',
	maxWidth: 260,
	lineHeight: 24,
 },

 footer: {},

 select: {
	height: 60,
	backgroundColor: '#FFF',
	borderRadius: 10,
	marginBottom: 8,
	paddingHorizontal: 24,
	fontSize: 16,
 },

 input: {
	height: 60,
 },

 button: {
	backgroundColor: '#34CB79',
	height: 60,
	flexDirection: 'row',
	borderRadius: 10,
	overflow: 'hidden',
	alignItems: 'center',
	marginTop: 8,
 },
 buttonDisabled:{
	borderRadius: 10,
	backgroundColor:'#d7d7d7'
 },
 buttonIcon: {
	borderBottomLeftRadius: 10,
	borderTopLeftRadius: 10,
	height: 60,
	width: 60,
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
	justifyContent: 'center',
	alignItems: 'center'
 },

 buttonText: {
	flex: 1,
	justifyContent: 'center',
	textAlign: 'center',
	color: '#FFF',
	fontFamily: 'Roboto_500Medium',
	fontSize: 16,
 }
});

export const defaultStyles = StyleSheet.create({
 viewContainer: {
	alignSelf: 'stretch',
 },
 iconContainer: {
	position: 'absolute',
	right: 0,
 },
 modalViewTop: {
	flex: 1,
 },
 modalViewMiddle: {
	height: 45,
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingHorizontal: 10,
	backgroundColor: '#f8f8f8',
	borderTopWidth: 1,
	borderTopColor: '#dedede',
	zIndex: 2,
 },
 chevronContainer: {
	flexDirection: 'row',
 },
 chevron: {
	width: 15,
	height: 15,
	backgroundColor: 'transparent',
	borderColor: '#a1a1a1',
	borderTopWidth: 1.5,
	borderRightWidth: 1.5,
 },
 chevronUp: {
	marginLeft: 11,
	transform: [{ translateY: 4 }, { rotate: '-45deg' }],
 },
 chevronDown: {
	marginLeft: 22,
	transform: [{ translateY: -5 }, { rotate: '135deg' }],
 },
 chevronActive: {
	borderColor: '#007aff',
 },
 done: {
	color: '#007aff',
	fontWeight: '600',
	fontSize: 17,
	paddingTop: 1,
	paddingRight: 11,
 },
 doneDepressed: {
	fontSize: 19,
 },
 modalViewBottom: {
	justifyContent: 'center',
	backgroundColor: '#d0d4da',
 },
 placeholder: {
	color: 'black',
 },
 headlessAndroidPicker: {
	position: 'absolute',
	width: '100%',
	height: '100%',
	color: 'transparent',
	opacity: 0,
 },
})
