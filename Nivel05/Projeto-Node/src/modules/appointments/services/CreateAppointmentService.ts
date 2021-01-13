import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/*
Recebimento das informações
Tratativas de erros/ excessões
Acesso ao Repositório
*/

// interface Recebimento de dados da requisição
interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  // Através de injeção de dependência enviamos nosso ApppoinrmentRepository do typeorm, assim podemos ter as funções criadas para utilizarmos aqui
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository, // importamos essa interface para termos uma noção dos métodos contidos na classe AppointmentsRepository
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    // Pegando o valor inicial da hora
    const appointmentDate = startOfHour(date);

    // Verifica se já tem algum appointment para esse horário
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      // Passa os valores para a memória
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
