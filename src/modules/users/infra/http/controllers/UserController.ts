import { Request, Response } from 'express';
import { container } from 'tsyringe';
// Middleware de autenticação
import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Recebendo dados do usuário
    const { name, email, password } = request.body;
    // Instanciando serviço de criação de usuário
    const createUser = container.resolve(CreateUserService);

    // Executando serviço de criação
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    // Removendo senha do usuário
    delete user.password;
    // Retornando resposta ao usuário
    return response.json(user);
  }
}

export default UserController;
