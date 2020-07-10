import { getRepository, Repository } from 'typeorm';
// Interface do repositorio user
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// DTO create user
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
// Modelo do usuário
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  // Busca de user por id
  public async findById(id: string): Promise<User | undefined> {
    // Buscando por filtro data
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });
    // Retorno do user
    return findUser;
  }

  // Busca de user por email
  public async findByEmail(email: string): Promise<User | undefined> {
    // Buscando por filtro data
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });
    // Retorno do user
    return findUser;
  }

  // Cria o usuário
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    // Metodo de criação do usuário
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    // Retorno do usuário
    return user;
  }

  // Atualiza o usuário
  public async save(user: User): Promise<User> {
    // Retorno do usuário
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
