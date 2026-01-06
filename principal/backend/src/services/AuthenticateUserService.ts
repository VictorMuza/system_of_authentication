import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { database } from '../database'

interface AuthenticateDTO {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateDTO) {
        const db = await database

        const user = await db.get(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (!user) {
            throw new Error('Email ou senha incorretos')
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        )

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos')
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d'
            }
        )

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    }
}

export default new AuthenticateUserService()
