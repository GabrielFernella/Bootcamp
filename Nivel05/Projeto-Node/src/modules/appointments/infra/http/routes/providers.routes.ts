// Cada arquivo de rota é resposável por suas sub-rotas, assim mantemos uma melhor organizalão e respeitando os princípios de SRP

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // Middleware de autenticação

import ProfilersController from '../controllers/ProfilersController';

const providersRouter = Router();

const profilersController = new ProfilersController();

providersRouter.use(ensureAuthenticated); // Middleware executa antes das seguintes rotas

providersRouter.get('/', profilersController.index);

export default providersRouter;
