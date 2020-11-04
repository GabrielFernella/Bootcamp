import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentRepository';

/*
Recebimento das informações
Tratativas de erros/excessões
Acesso ao Repositório
*/

//interface Recebimento de dados da requisição
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  //this  e o tipo
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
    //vc está referenciando o this ao appointmentsRepository que está vindo do constructor
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    //Verifica se já tem algum appointment para esse horário
    //this.appointmentRepository se refere ao private appointmentRepository
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

    return appointment;
  }
}

export default CreateAppointmentService;
