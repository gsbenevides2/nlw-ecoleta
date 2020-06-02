import path from 'path'
const {
 DATABASE_HOST,
 DATABASE_USERNAME,
 DATABASE_PASSWORD
} = process.env
module.exports = {
 client:'mysql',
 connection:{
	host:DATABASE_HOST,
	database:'ecoleta',
	user:DATABASE_USERNAME,
	password:DATABASE_PASSWORD,
	port:3306
 },
 migrations:{
	directory:path.resolve(__dirname,'src','database','migrations')
 },
 seeds:{
	directory:path.resolve(__dirname,'src','database','seeds')
 }
}
