import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // Tratativas de erros

import User from '@modules/users/infra/typeorm/entities/User'; // Model de User
import uploadConfig from '@config/upload'; // Configurações do upload

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // Procurando o user
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar); // deletando o arquivo caso exista
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename); // salvando o arquivo

    // Passando novo avatar para o user
    user.avatar = fileName;
    await this.usersRepository.save(user); // salvando o caminho do arquivo

    return user;
  }
}

export default UpdateUserAvatarService;
