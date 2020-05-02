import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateAuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    // Repositório do usuário
    const usersRepository = getRepository(User);
    // Buscando usuário
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });
    // Senão encontrar resultado gera erro
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    // Comparando senha do usuário encontrado com senha recebida
    const passwordMatched = await compare(password, user.password);
    // Se senha não bater gera erro
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    // Removendo a senha do usuário
    delete user.password;
    // Gerando token
    const token = sign({ name: user.name }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    // Enviando resposta
    return { user, token };
  }
}

export default CreateAuthUserService;
