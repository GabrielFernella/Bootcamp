import { getRepository } from 'typeorm'; // para conseguirmos manipular informações do repository
import { compare } from 'bcryptjs'; // funções do bcrypt (Compara uma senha criptografada com uma não criptografada)
import { sign } from 'jsonwebtoken'; //
import authConfig from '../config/auth'; // Configurações de autenticação

import AppError from '../errors/AppError'; // Tratativas de erros

import User from '../models/User'; // passando o repository para buscar info do models

interface Request {
  email: string;
  password: string;
}

// Interface que está sendo retornada
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Procurando um usuário que bate com o email
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Comparando as duas Strings de senha
    // user.password - Senha criptografada
    // password - Senha passada na requisição(não criptografada)
    const passwordMatched = await compare(password, user.password);
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
