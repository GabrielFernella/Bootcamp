import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    // Busca todos os dias do mes
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      // Cria um array com o tamanho de todos dos dias do mes e add um index
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // verifica se o dia está disponível
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10, // Verificando se tem algum horário disponível
      };
    });

    console.log(eachDayArray);
    console.log(appointments);

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
