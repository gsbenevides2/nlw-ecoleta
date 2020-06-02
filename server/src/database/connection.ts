import knex from 'knex'

const {
 DATABASE_HOST,
 DATABASE_USERNAME,
 DATABASE_PASSWORD
} = process.env
const connection = knex({
 client:'mysql',
 connection:{
	host:DATABASE_HOST,
	database:'ecoleta',
	user:DATABASE_USERNAME,
	password:DATABASE_PASSWORD,
	port:3306
 },
})

export default connection

