import bcrypt from 'bcrypt';

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserDTO) {
        if (!name || !email || !password) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        if (password.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: Math.floor(Math.random() + 1000),
            name,
            email,
            password_hash: hashedPassword
        }
        return user;
    }
}

export default new CreateUserService();