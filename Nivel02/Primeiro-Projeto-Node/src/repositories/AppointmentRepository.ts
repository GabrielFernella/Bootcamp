// Trabalha com os dados (Listar,Altear,Deletar..)
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // Passar como parâmetro o model
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({ where: { date } });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
