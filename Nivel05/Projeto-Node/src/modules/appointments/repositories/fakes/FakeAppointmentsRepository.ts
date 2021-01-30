// Arquivo destinado a testes, são muitos similares aos arquivos de repositories, porém, com modificações sem a necessidade de um banco de dados

import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  // ao invés de banco de dados, usamos um array para armazenar os dados
  private appointments: Appointment[] = [];

  // Métodos
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  // Essa função verifica se possui um dia disponível e valida para o retorno
  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // Introduzir os valores ao array
    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

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
