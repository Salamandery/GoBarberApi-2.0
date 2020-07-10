import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
// Modelo de agendamento
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
// Repositório de agendamento
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// Interface dos dados recebidos
interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentRepository: IAppointmentRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentRepository: IAppointmentRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
  }

  // Executa o serviço
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    // Conversão de data por hora
    const appointmentDate = startOfHour(date);

    // Verificação de agendamento por data
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    // Se já existir um agendamento retorna erro
    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked', 400);
    }

    // Criando agendamento no repositório
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Retornando criação do agendamento
    return appointment;
  }
}

export default CreateAppointmentService;
