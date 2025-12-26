import {Request, Response} from 'express';

class UsersController {
    create(req: Request, res: Response){
        const { name, email, password } = req.body;
    
        return res.json({
            message: 'Usuário recebido com sucesso',
            data: {
                name,
                email
            }
        });
    }
}

export default new UsersController();