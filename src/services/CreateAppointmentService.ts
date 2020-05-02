import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
// Modelo de agendamento
import Appointment from '../models/Appointment';
// Repositório de agendamento
import AppointmentRepository from '../repositories/AppointmentsRepository';

// Interface dos dados recebidos
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // Executa o serviço
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    // Conversão de data por hora
    const appointmentDate = startOfHour(date);

    // Verificação de agendamento por data
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    // Se já existir um agendamento retorna erro
    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked', 400);
    }

    // Criando agendamento no repositório
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // Salvando informação no banco de dados
    await appointmentRepository.save(appointment);
    // Retornando criação do agendamento
    return appointment;
  }
}

export default CreateAppointmentService;
