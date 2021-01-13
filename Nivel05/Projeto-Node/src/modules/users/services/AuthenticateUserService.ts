import { sign } from 'jsonwebtoken'; //
import authConfig from '@config/auth'; // Configurações de autenticação
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // Tratativas de erros

import User from '@modules/users/infra/typeorm/entities/User'; // passando o repository para buscar info do models

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

// Interface que está sendo retornada
interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Procurando um usuário que bate com o email
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Comparando as duas Strings de senha
    // user.password - Senha criptografada
    // password - Senha passada na requisição(não criptografada)
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Usuário autenticado
    const { secret, expiresIn } = authConfig.jwt; // buscando as configurações
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
