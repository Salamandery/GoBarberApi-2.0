import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

// Interface de dados solicitados
interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // Criando repositório temporário
    const userRepository = getRepository(User);
    // Verificando se email já existe
    const Exists = await userRepository.findOne({
      where: { email },
    });
    // Se existe gera erro
    if (Exists) {
      throw new Error('User already exists.');
    }

    // Criptografia de senha
    const hashPassword = await hash(password, 8);

    // Criando usuário no repositório
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    // Salvando usuário no banco de dados
    await userRepository.save(user);
    // Retornando resultado da criação
    return user;
  }
}

export default CreateUserService;
