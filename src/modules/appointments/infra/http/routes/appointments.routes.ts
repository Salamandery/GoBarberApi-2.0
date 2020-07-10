import { Router } from 'express';
// Serviço de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// Controller appointment
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
// Rota do agendamento
const appointmentRouter = Router();
// Rota autenticada
appointmentRouter.use(ensureAuthenticated);
// Inicialização do controller
const appointmentController = new AppointmentController();
// appointmentRouter.get('/', async (request, response) => {
//   // Lista de agendamentos
//   const appointments = await appointmentRepository.find();
//   // Retorno para o usuário
//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentController.create);

export default appointmentRouter;
