import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
// Repositório do agendamento
import AppointmentRepository from '../repositories/AppointmentsRepository';
// Serviço de criação de agendamento
import CreateAppointmentService from '../services/CreateAppointmentService';

// Rota do agendamento
const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  // Gerando repositório
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  // Lista de agendamentos
  const appointments = await appointmentRepository.find();
  // Retorno para o usuário
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  // Recebendo dados do usuário
  const { provider_id, date } = request.body;

  // Conversão de data
  const parseDate = parseISO(date);
  // Instanciando serviço de criação de agendamento
  const createAppointment = new CreateAppointmentService();
  // Criando agendamento através do serviço
  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });
  // Retorno para o usuário
  return response.json(appointment);
});

export default appointmentRouter;
