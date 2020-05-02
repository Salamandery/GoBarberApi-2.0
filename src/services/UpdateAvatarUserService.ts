import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import User from '../models/User';
// Configuração do upload de arquivos
import uploadConfig from '../config/upload';

interface Request {
  id: string;
  filename: string;
}

class UpdateAvatarUserService {
  public async execute({ id, filename }: Request): Promise<User> {
    // Criando repositório do usuário
    const userReporitory = getRepository(User);

    // Buscando usuário
    const user = await userReporitory.findOne({ where: { id } });
    // Se usuário não existir gera erro
    if (!user) {
      throw new AppError('User is not exists', 401);
    }

    if (user.avatar) {
      // Se existir avatar deleta o avatar existente
      // Caminho do arquivo no servidor
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Se existir o arquivo
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);
      // Se existir deleta arquivo do avatar
      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Altera nome do arquivo de avatar do usuário
    user.avatar = filename;
    // Salva informações
    await userReporitory.save(user);

    // Deleta senha do usuário
    delete user.password;
    // Retorna informações do usuário
    return user;
  }
}

export default UpdateAvatarUserService;
