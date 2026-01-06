import bcrypt from 'bcrypt'
import { database } from '../database'

interface CreateUserDTO {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserDTO) {
        if (!name || !email || !password) {
            throw new Error('Nome, email e senha são obrigatórios')
        }

        if (password.length < 6) {
            throw new Error('A senha deve ter no mínimo 6 caracteres')
        }

        const db = await database

        // Verificar se email já existe
        const userExists = await db.get(
            'SELECT id FROM users WHERE email = ?',
            [email]
        )

        if (userExists) {
            throw new Error('Email já cadastrado')
        }

        const password_hash = await bcrypt.hash(password, 10)

        const result = await db.run(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, password_hash]
        )

        return {
            id: result.lastID,
            name,
            email
        }
    }
}

export default new CreateUserService()
