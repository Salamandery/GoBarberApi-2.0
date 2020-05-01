import { startOfHour } from 'date-fns';
// Modelo de agendamento
import Appointment from '../models/Appointment';
// Repositório de agendamento
import AppointmentRepository from '../repositories/AppointmentsRepository';

// Interface dos dados recebidos
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  // repositório temporário de agendamento
  private appointmentRepository: AppointmentRepository;

  // Inicia instancia do serviço
  constructor(appointmentRepository: AppointmentRepository) {
    // Iniciando repositório de agendamento
    this.appointmentRepository = appointmentRepository;
  }

  // Executa o serviço
  public execute({ provider, date }: Request): Appointment {
    // Conversão de data por hora
    const appointmentDate = startOfHour(date);

    // Verificação de agendamento por data
    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    // Se já existir um agendamento retorna erro
    if (findAppointmentInSameDate) {
      throw Error('this appointment is already booked');
    }

    // Criando agendamento no repositório
    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });
    // Retornando criação do agendamento
    return appointment;
  }
}

export default CreateAppointmentService;
