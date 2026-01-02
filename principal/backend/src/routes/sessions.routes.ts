import { Router } from 'express'
import SessionsController from '../controllers/SessionsController'

const sessionsRoutes = Router()

sessionsRoutes.post('/sessions', SessionsController.create)

export default sessionsRoutes
