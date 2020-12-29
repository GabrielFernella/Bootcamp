// Arquivo destinado a testes, são muitos similares aos arquivos de repositories, porém, com modificações sem a necessidade de um banco de dados

import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  // Métodos
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // Introduzir os valores ao array
    Object.assign(appointment, { id: uuid(), date, provider_id });

    // alternativa
    /*
    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id; */

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
