import { Router } from 'express'

const routes = Router()

routes.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})

routes.post('/users', (req, res) => {

})

routes.get('/users/me', (req, res) => {

})

export default routes
