import express from 'express'

const app = express()

app.get('/users',(request,response)=>{
 response.json({
	name:'Hello world'
 })
})

app.listen(3333)
