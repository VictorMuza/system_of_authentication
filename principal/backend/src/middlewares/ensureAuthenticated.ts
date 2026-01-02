import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não fornecido'
        })
    }

    return next();
}