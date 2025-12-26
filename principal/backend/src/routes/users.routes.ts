import { Router } from 'express'

const usersRoutes = Router()

usersRoutes.post('/users', (req, res) => {
  const { name, email, password } = req.body

  return res.json({
    message: 'Usuário recebido com sucesso',
    data: {
      name,
      email
    }
  })
})

export default usersRoutes
