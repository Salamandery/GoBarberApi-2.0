import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  id: string;
  filename: string;
}

@injectable()
class UpdateAvatarUserService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ id, filename }: IRequest): Promise<User> {
    // Buscando usuário
    const user = await this.usersRepository.findById(id);
    // Se usuário não existir gera erro
    if (!user) {
      throw new AppError('User is not exists', 401);
    }

    if (user.avatar) {
      // Se existir avatar deleta o avatar existente
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(filename);

    // Altera nome do arquivo de avatar do usuário
    user.avatar = fileName;
    // Salva informações
    await this.usersRepository.save(user);

    // Deleta senha do usuário
    delete user.password;
    // Retorna informações do usuário
    return user;
  }
}

export default UpdateAvatarUserService;
