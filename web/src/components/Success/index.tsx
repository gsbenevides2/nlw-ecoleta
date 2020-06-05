import React from 'react'
import Lottie from "react-lottie"
import animationData from '../../assets/successAnimation.json'
import { FiHome } from 'react-icons/fi'
import {Link} from 'react-router-dom'
import './styles.css'

interface Props {
 visible:boolean
}
const Success:React.FC<Props> = (props)=>{
 return (
	<div id="success-modal" style={{
	 display:props.visible ? 'block' :'none'
	}}>
	 <div className='content'>
		<Lottie
		 width={200}
		 height={200}
		 options={{
			animationData,
			 loop:false,
			 autoplay:true,
			 rendererSettings:{
				preserveAspectRatio:'xMidYMid slice'
			 }
		 }}
		/> 
	 <h1>Cadastro Concluido</h1>
	 <Link to='/'>
			<span>
			 <FiHome />
			</span>
			<strong>Ir para home</strong>
	 </Link>
	</div>
 </div>
)
}
export default Success
