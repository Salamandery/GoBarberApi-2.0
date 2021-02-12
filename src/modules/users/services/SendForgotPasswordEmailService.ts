import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// Interface de dados solicitados
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.userRepository = usersRepository;
  }

  public async execute({ email }: IRequest): Promise<User> {
    // Verificando se email já existe
    const Exists: User = await this.userRepository.findByEmail(email);
    // Se existe gera erro
    if (Exists) {
      throw new AppError('User already exists.', 400);
    }
    // Retornando resultado da criação
    return Exists;
  }
}

export default SendForgotPasswordEmailService;
