import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; // Pega as propriedades do repository

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

/*
Recebimento das informações
Tratativas de erros/ excessões
Acesso ao Repositório
*/

// interface Recebimento de dados da requisição
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    // appointmentsRepository agora possui todos os métodos de repository, a partir daí podemos manipular os dados para o banco
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // Pegando o valor inicial da hora
    const appointmentDate = startOfHour(date);

    // Verifica se já tem algum appointment para esse horário
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      // Passa os valores para a memória
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment); // Efetiva a inserção no banco de dados

    return appointment;
  }
}

export default CreateAppointmentService;
