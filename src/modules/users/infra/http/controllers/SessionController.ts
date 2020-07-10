import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Serviço de autenticação
import CreateAuthUserService from '@modules/users/services/CreateAuthUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Recebendo dados do usuário
    const { email, password } = request.body;
    // Criando serviço de autenticação
    const authUserService = container.resolve(CreateAuthUserService);

    // usuário autenticado
    const { user, token } = await authUserService.execute({
      email,
      password,
    });

    // Retornando resposta ao usuário
    return response.json({
      user,
      token,
    });
  }
}

export default UserController;
