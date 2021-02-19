import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

// Interface de dados solicitados
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private userRepository: IUsersRepository;

  private userTokenRepository: IUserTokenRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('MailProvider')
    mmailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    userTokenRepository: IUserTokenRepository,
  ) {
    this.userRepository = usersRepository;
    this.mailProvider = mmailProvider;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    // Verificando se email já existe
    const Exists = await this.userRepository.findByEmail(email);
    // Se não existe gera erro
    if (!Exists) {
      throw new AppError('User does not exists.', 400);
    }
    // Gerando token
    await this.userTokenRepository.generate(Exists.id);
    // Enviando email
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
