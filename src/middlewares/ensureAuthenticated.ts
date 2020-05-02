import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    throw new Error('JWT token is missing');
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
    throw new Error('Invalid JWT token');
  }
}
