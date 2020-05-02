import { Router } from 'express';
import multer from 'multer';
// Middleware de autenticação
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// Serviço de criação de agendamento
import CreateUserService from '../services/CreateUserService';
// Serviço de atualização de imagem
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

// Multer configuração
import multerConfig from '../config/upload';
// Iniciando multer para upload
const upload = multer(multerConfig);
// Rotas de usuários
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // Criação do serviço de atualização do avatar do usuário
    const updateAvatarUser = new UpdateAvatarUserService();
    // id do usuário
    const { id } = request.user;
    // Atualizando avatar do usuário
    const user = await updateAvatarUser.execute({
      id,
      filename: request.file.filename,
    });
    // Respondendo usuário
    return response.json(user);
  },
);

export default usersRouter;
