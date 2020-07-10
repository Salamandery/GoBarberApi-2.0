import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateAuthUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Buscando usuário
    const user = await this.usersRepository.findByEmail(email);
    // Senão encontrar resultado gera erro
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    // Comparando senha do usuário encontrado com senha recebida
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
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
