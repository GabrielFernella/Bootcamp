import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError'; // Tratativas de erros

import User from '../models/User'; // Model de User
import uploadConfig from '../config/upload'; // Configurações do upload

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Procurando o user
    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // path.join junta os dois caminhos

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // Verifica o status do arquivo, assim saberemos se existe
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // desfaz o caminho
      }
    }

    // Passando novo avatar para o user
    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
