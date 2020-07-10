import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
// Serviço de criação de agendamento
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Recebendo dados do usuário
    const { provider_id, date } = request.body;
    // Conversão de data
    const parseDate = parseISO(date);
    // Instanciando serviço de criação de agendamento
    const createAppointment = container.resolve(CreateAppointmentService);
    // Criando agendamento através do serviço
    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });
    // Retorno para o usuário
    return response.json(appointment);
  }
}

export default AppointmentController;
