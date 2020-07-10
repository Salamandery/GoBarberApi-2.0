import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';
// Rota do agendamento
const sessionsRouter = Router();
// Inicializando controller
const sessionController = new SessionController();

// Criando sessão do usuário
sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
