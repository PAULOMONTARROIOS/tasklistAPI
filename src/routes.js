import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import TaskController from './app/controllers/TaskController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/sessions', SessionController.store)

routes.post('/users', UserController.store)

routes.use(authMiddleware)
routes.put('/users', UserController.update)

routes.post('/tasks', TaskController.store)
routes.get('/tasks', TaskController.index)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.delete)

export default routes
