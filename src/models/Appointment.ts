import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Construtor do modelo omitindo o id do apontamento
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Gerando uuid
    this.id = uuid();
    // Recebendo provedor
    this.provider = provider;
    // Recebendo data
    this.date = date;
  }
}

export default Appointment;
