import { uuid } from 'uuidv4';
// Interface do repositorio user
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// DTO create user
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
// Modelo do usuário
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  // Busca de user por id
  public async findById(id: string): Promise<User | undefined> {
    // Buscando por filtro id
    const findUser: User | undefined = this.users.find(user => user.id === id);
    // Retorno do user
    return findUser;
  }

  // Busca de user por email
  public async findByEmail(email: string): Promise<User | undefined> {
    // Buscando por filtro email
    const findUser: User | undefined = this.users.find(
      user => user.email === email,
    );
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
    const user: User = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    // Retorno do usuário
    return user;
  }

  // Atualiza o usuário
  public async save(user: User): Promise<User> {
    // Buscando por filtro id
    const findIndex: number | undefined = this.users.findIndex(
      findUser => findUser.id === user.id,
    );
    // Retorno do usuário
    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
