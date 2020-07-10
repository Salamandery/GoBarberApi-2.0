import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Token do header
  const authHeader = request.headers.authorization;
  // Senão existir token
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  // Desestruturando token
  const [, token] = authHeader.split(' ');
  try {
    // Token decodificado
    const decoded = verify(token, authConfig.jwt.secret);
    // Informação do usuário
    const { sub } = decoded as TokenPayload;
    // Definindo usuário nas rotas
    request.user = {
      id: sub,
    };

    // Continua aplicação
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
