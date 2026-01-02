import { Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

class SessionsController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const result = await AuthenticateUserService.execute({
                email,
                password
            })

            return res.json(result)
        } catch (error: any) {
            return res.status(401).json({
                error: error.message
            })
        }
    }
}

export default new SessionsController()
