import { Router } from 'express';

import multer from 'multer';
// Controller usuário
import UserController from '@modules/users/infra/http/controllers/UserController';
// Controller usuário avatar
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

// Multer configuração
import multerConfig from '@config/upload';
// Serviço de atualização de imagem
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// Iniciando multer para upload
const upload = multer(multerConfig);
// Rotas de usuários
const usersRouter = Router();
// Inicializando controller
const userController = new UserController();
// Inicializando controller
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
