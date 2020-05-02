import { Router } from 'express';
// Serviço de autenticação
import CreateAuthUserService from '../services/CreateAuthUserService';

// Rota do agendamento
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  // Recebendo dados do usuário
  const { email, password } = request.body;
  // Criando serviço de autenticação
  const authUserService = new CreateAuthUserService();

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
});

export default sessionsRouter;
