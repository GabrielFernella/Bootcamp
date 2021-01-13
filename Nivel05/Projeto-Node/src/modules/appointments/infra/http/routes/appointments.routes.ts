// Cada arquivo de rota é resposável por suas sub-rotas, assim mantemos uma melhor organizalão e respeitando os princípios de SRP
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // Middleware de autenticação
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated); // Middleware executa antes das seguintes rotas

/* appointmentsRouter.get('/', async (request, response) => {
  const appointment = await appointmentsRepository.find(); // buscando todos os dados de appointment

  return response.json(appointment);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
