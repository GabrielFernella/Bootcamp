import { request, Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
  return response.json({ message: 'Appointment' });
});

export default appointmentsRouter;
