import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UsersController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const user = await CreateUserService.execute({ name, email, password });
            // Aqui você pode adicionar a lógica para salvar o usuário no banco de dados
            // Por enquanto, vamos apenas retornar uma resposta de sucesso

            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

}

export default new UsersController();