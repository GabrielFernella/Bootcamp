import { Router } from 'express';
import appointment from './appointments.routes';

const routes = Router();

routes.use(appointment);

export default routes;
