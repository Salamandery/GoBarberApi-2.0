import { Request, Response } from 'express';
import { container } from 'tsyringe';
// Serviço de criação de agendamento
import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    // Criação do serviço de atualização do avatar do usuário
    const updateAvatarUser = container.resolve(UpdateAvatarUserService);
    // id do usuário
    const { id } = request.user;
    // Atualizando avatar do usuário
    const user = await updateAvatarUser.execute({
      id,
      filename: request.file.filename,
    });
    // Respondendo usuário
    return response.json(user);
  }
}

export default UserAvatarController;
