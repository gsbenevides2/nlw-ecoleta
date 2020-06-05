import React from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'
import './styles.css'
interface Props {
 onFileUploaded:(file:File)=>void;
}
const Dropzone :React.FC<Props> = ({onFileUploaded})=>{
 const [fileUrl, setFileUrl] = React.useState('')

 const onDrop = React.useCallback(([file])=>{
	const fileUrl = URL.createObjectURL(file)
	setFileUrl(fileUrl)
	onFileUploaded(file)
 },[onFileUploaded])
 const { getRootProps, getInputProps } = useDropzone({
	onDrop,
	accept: 'image/*'
 })
 return (
	<div className="dropzone" {...getRootProps()}>
	 <input {...getInputProps()} accept='image/*' />

	 {fileUrl
		? <img src={fileUrl} alt='Point thumbnail' />
		: (
		 <p>
			<FiUpload />
			Imagem do Estabelecimento
		 </p>
		)
	 }

	</div>
 )
}

export default Dropzone
