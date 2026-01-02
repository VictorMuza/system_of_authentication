import { Router } from 'express'
import usersRoutes from './users.routes'
import sessionsRoutes from './sessions.routes'

const routes = Router()

routes.use(usersRoutes)
routes.use(sessionsRoutes)

export default routes
