import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
// Interface do repositorio appointment
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// DTO create appointment
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';
// Modelo do agendamento
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  // Busca de agendamento por data
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Buscando por filtro data
    const findAppointment:
      | Appointment
      | undefined = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    // Retorno do agendamento
    return findAppointment;
  }

  // Cria o agendamento
  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    // Metodo de criação do agendamento
    const appointment: Appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    // Retorno do agendamento
    return appointment;
  }
}

export default AppointmentsRepository;
