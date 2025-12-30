import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

class UsersController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nome, email e senha são obrigatórios'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'A senha deve ter pelo menos 6 caracteres'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Aqui você pode adicionar a lógica para salvar o usuário no banco de dados
        // Por enquanto, vamos apenas retornar uma resposta de sucesso

        return res.status(201).json({
            message: 'Usuário criado com senha protegida',
            data: {
                name,
                email,
                passwordHashPreview: hashedPassword.substring(0, 20) + '...'
            }
        })
    }
}

export default new UsersController();