import { Router } from 'express';
// Middleware de autenticação
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// Rotas de agendamento
import appointmentsRouter from './appointments.routes';
// Rotas de usuários
import usersRouter from './users.routes';
// Rotas de sessão
import sessionsRouter from './sessions.routes';

const Routes = Router();

// Instanciando rotas de agendamento
Routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
// Instanciando rotas de usuários
Routes.use('/users', usersRouter);
// Instanciando rotas de sessão
Routes.use('/sessions', sessionsRouter);

export default Routes;
