import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id; // buscado pelo middleware
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // pegando o valor da requisição e transformando em um date

    // Chamando o service que utiliza injeção de dependencia
    // Carrega o service, vê o constructor se precisa de uma dependencia, verifica no container se tem uma instancia e retorna a mesma
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
