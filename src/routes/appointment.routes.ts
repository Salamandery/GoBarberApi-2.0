import { Router } from 'express';
import { parseISO } from 'date-fns';
// Repositório do agendamento
import AppointmentRepository from '../repositories/AppointmentsRepository';
// Serviço de criação de agendamento
import CreateAppointmentService from '../services/CreateAppointmentService';
// Rota do agendamento
const appointmentRouter = Router();
// Criando instancia Repositório do agendamento
const appointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (request, response) => {
  // Lista de agendamentos
  const appointments = appointmentRepository.all();
  // Retorno para o usuário
  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    // Recebendo dados do usuário
    const { provider, date } = request.body;

    // Conversão de data
    const parseDate = parseISO(date);
    // Instanciando serviço de criação de agendamento
    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );
    // Criando agendamento através do serviço
    const appointment = createAppointment.execute({
      provider,
      date: parseDate,
    });
    // Retorno para o usuário
    return response.json(appointment);
  } catch (err) {
    // Erro gerado pelas regras de negócio
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentRouter;
