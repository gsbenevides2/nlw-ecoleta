import {Request,Response} from 'express'
import knex from '../database/connection'

class ItemsController {
 async index(request:Request,response:Response){
	const items = await knex('items').select('*')
	const serializedItems = items.map(item=>{
	 const {title,image,id} = item
	 const image_url = `http://localhost:3333/uploads/${image}`
	 return {id,title,image_url}
	})
	return response.json(serializedItems)
 }
}
export default ItemsController
