import { Router } from 'express';
import multer from 'multer'; // tratativa de arquivos de imagens do avatar

import uploadConfig from '@config/upload'; // importando as configurações de upload

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // verificar se está autenticado

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  // Instancia a classe de create User e executa a função passando os parâmetros
  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  // Retornando o usuário sem a senha
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userWithoutPassword);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated, // middleware de autenticação
  upload.single('avatar'), // middleware de upload de arquivo passando o nome do campo
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService(); // instanciando o service

    // Pegando os dados retornados do service
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename, // nome do arquivo
    });

    // Retornando o objeto User sem a senha
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  },
);

export default usersRouter;
