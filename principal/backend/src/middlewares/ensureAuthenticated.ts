import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    userId: string
    iat: number
    exp: number
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não fornecido'
        })
    }

    // Formato esperado: Bearer token
    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as TokenPayload

        // Aqui no futuro você pode usar o userId
        req.userId = decoded.userId

        return next()
    } catch {
        return res.status(401).json({
            error: 'Token inválido'
        })
    }
}
