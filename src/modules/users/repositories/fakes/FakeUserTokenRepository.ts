import { uuid } from 'uuidv4';
// Interface do repositorio user
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
// Modelo do usuário
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private usersToken: UserToken[] = [];

  // Busca de user por id
  public async generate(user_id: string): Promise<UserToken> {
    // Criando instancia
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    // Gravando informação
    this.usersToken.push(userToken);
    // Retorno do user
    return userToken;
  }
}

export default FakeUserTokenRepository;
