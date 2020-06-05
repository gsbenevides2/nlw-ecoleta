import {Request,Response} from 'express'
import knex from '../database/connection'

interface Point {
 id:number;
 name:string;
 image: string;
 email: string;
 whatsapp:string;
 uf:string;
 city:string;
 latitude:number;
 longitude:number;
}

 class PointsController {
	async index(request:Request,response:Response){
	 const {city,items,uf} = request.query
	 let points :Point[]
	 if(items){
		const parsedItems = String(items)
		 .split(',')
		 .map(item=>Number(item.trim()))

		points = await knex('points')
		 .join('point_items', 'points.id', '=', 'point_items.point_id')
		 .whereIn('point_items.item_id', parsedItems)
		 .where('city', String(city))
		 .where('uf', String(uf))
		 .distinct()
		 .select('points.*')
	 }
	 else points = []

	 return response.json(points)
	}
	async show(request:Request,response:Response){
	 const {id} = request.params

	 const point = await knex('points')
		.where('id',id)
		.first()
	 if(!point){
		return response.status(404)
		 .json({
			message:'Point not found.'
		 })
	 }
	 const items = await knex('items')
		.join('point_items', 'items.id', '=', 'point_items.item_id')
		.where('point_items.point_id', id)
		.select('items.title')

	 return response.json({ point, items })
	}
	async create(request:Request,response:Response){
	 const {
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
		items,
	 } = request.body
	 const point = {
		image:'https://picsum.photos/300/200',
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
	 }
	 const transaction = await knex.transaction()
	 const insertedIds = await transaction('points')
		.insert(point)

	 const point_id = insertedIds[0]

	 const pointItems = items.map((item_id:number)=>{
		return {
		 item_id,
		 point_id
		}
	 })
	 await transaction('point_items')
		.insert(pointItems)
	 await transaction.commit()

	 return response.json({
		id:point_id,
		...point
	 })
	}
 }
export default PointsController
