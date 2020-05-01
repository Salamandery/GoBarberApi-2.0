import { isEqual } from 'date-fns';
// Modelo do agendamento
import Appointment from '../models/Appointment';

// Interface do agendamento
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  // Variavel agendamentos
  private appointments: Appointment[];

  // Construtor da classe
  constructor() {
    this.appointments = [];
  }

  // Listando agendamentos
  public all(): Appointment[] {
    // Retorno dos agendamentos
    return this.appointments;
  }

  // Busca de agendamento por data
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    // Retorno do agendamento
    return findAppointment || null;
  }

  // Criando agendamento
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    // Criando agendamento no modelo
    const appointment = new Appointment({ provider, date });
    // Criando agendamento na lista
    this.appointments.push(appointment);
    // Retorno da criação do agendamento
    return appointment;
  }
}

export default AppointmentsRepository;
