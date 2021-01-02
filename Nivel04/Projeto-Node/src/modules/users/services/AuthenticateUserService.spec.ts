import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    // Criando o usuário
    await createUser.execute({
      name: 'john doe',
      email: 'johndoe@exemple.com',
      password: '1234',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: '1234',
    });

    // espera que user tenha um id
    expect(response).toHaveProperty('token');
  });
});
