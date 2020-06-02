import express from 'express'
import knex from './database/connection'
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()

const itemsController = new ItemsController()
routes.get('/items', itemsController.index)

const pointsController = new PointsController()
routes.get('/points',pointsController.index)
routes.get('/points/:id',pointsController.show)
routes.post('/points',pointsController.create)
export default routes
