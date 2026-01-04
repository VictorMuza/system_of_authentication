import { Router } from 'express'
import UsersController from '../controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router()

usersRoutes.post('/users', UsersController.create)

usersRoutes.get(
    '/users/profile',
    ensureAuthenticated,
    (req, res) => {
        return res.json({
            message: "Você acessou uma rota protegida",
            userId: req.userId
        })
    }
)
export default usersRoutes;