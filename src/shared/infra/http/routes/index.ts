import { Router } from 'express';
// Rotas de agendamento
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// Rotas de usuários
import usersRouter from '@modules/users/infra/http/routes/users.routes';
// Rotas de sessão
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const Routes = Router();

// Instanciando rotas de agendamento
Routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
// Instanciando rotas de usuários
Routes.use('/users', usersRouter);
// Instanciando rotas de sessão
Routes.use('/sessions', sessionsRouter);

export default Routes;
