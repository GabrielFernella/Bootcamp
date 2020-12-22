// Cada arquivo de rota é resposável por suas sub-rotas, assim mantemos uma melhor organizalão e respeitando os princípios de SRP
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// Repository and Service - Note que ambos podem ser importados dentro das rotas
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // Middleware de autenticação

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated); // Middleware executa antes das seguintes rotas

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository); // Pegando as propriedades de repository
  const appointment = await appointmentsRepository.find(); // buscando todos os dados de appointment

  return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date); // pegando o valor da requisição e transformando em um date

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
