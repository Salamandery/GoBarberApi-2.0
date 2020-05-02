import { EntityRepository, Repository } from 'typeorm';
// Modelo do agendamento
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Busca de agendamento por data
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Buscando por filtro data
    const findAppointment = await this.findOne({
      where: { date },
    });
    // Retorno do agendamento
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
