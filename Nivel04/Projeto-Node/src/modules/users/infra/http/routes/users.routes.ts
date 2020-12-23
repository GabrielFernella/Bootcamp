import { Router } from 'express';
import multer from 'multer'; // tratativa de arquivos de imagens do avatar
import uploadConfig from '@config/upload'; // importando as configurações de upload

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // verificar se está autenticado

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated, // middleware de autenticação
  upload.single('avatar'), // middleware de upload de arquivo passando o nome do campo
  userAvatarController.update,
);

export default usersRouter;
