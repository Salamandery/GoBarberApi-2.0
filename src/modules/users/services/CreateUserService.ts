import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// Interface de dados solicitados
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  private userRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.userRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Verificando se email já existe
    const Exists = await this.userRepository.findByEmail(email);
    // Se existe gera erro
    if (Exists) {
      throw new AppError('User already exists.', 400);
    }

    // Criptografia de senha
    const hashPassword = await this.hashProvider.generateHash(password);

    // Criando usuário no repositório
    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    // Retornando resultado da criação
    return user;
  }
}

export default CreateUserService;
