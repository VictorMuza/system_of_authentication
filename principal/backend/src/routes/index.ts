import { Router } from 'express'
import usersRoutes from './users.routes'

const routes = Router()

routes.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})

export default routes
