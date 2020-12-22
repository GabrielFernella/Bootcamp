import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError('Email address already in used', 400);
    }

    // Criando senha criptografada
    const hashedPassword = await hash(password, 8);

    // Cria o usuário na memoria
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    // Salva o usuário no banco
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
