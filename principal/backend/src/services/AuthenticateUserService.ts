import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface AuthenticateUserDTO {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateUserDTO) {
        // ⚠️ Simulação de usuário salvo
        const fakeUser = {
            id: 1,
            name: "Victor",
            email: "victor@email.com",
            password_hash: await bcrypt.hash("123456", 10)

        }
        // 1️⃣ Verificar email
        if (email !== fakeUser.email) {
            throw new Error('Email ou senha incorretos');
        }
        // 2️⃣ Verificar senha
        const passwordMatch = await bcrypt.compare(password, fakeUser.password_hash);

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos');
        }
        // 3️⃣ Gerar token
        const token = jwt.sign(
            { userId: fakeUser.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return {
            user: {
                id: fakeUser.id,
                name: fakeUser.name,
                email: fakeUser.email
            },
            token
        }
    }
}

export default new AuthenticateUserService();