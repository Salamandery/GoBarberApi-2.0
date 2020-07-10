import { getRepository, Repository } from 'typeorm';
// Interface do repositorio appointment
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// DTO create appointment
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';
// Modelo do agendamento
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // Busca de agendamento por data
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Buscando por filtro data
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    // Retorno do agendamento
    return findAppointment;
  }

  // Cria o agendamento
  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    // Metodo de criação do agendamento
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    // Retorno do agendamento
    return appointment;
  }
}

export default AppointmentsRepository;
