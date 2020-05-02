import { Router } from 'express';
// Serviço de criação de agendamento
import CreateUserService from '../services/CreateUserService';
// Rota do agendamento
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    // Recebendo dados do usuário
    const { name, email, password } = request.body;

    // Instanciando serviço de criação de usuário
    const createUser = new CreateUserService();

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
  } catch (err) {
    // Erro gerado pelas regras de negócio
    return response.status(400).json({ message: err.message });
  }
});

export default usersRouter;
