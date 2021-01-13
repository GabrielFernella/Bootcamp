import { Request, Response, NextFunction } from 'express'; // funções de middleware
import { verify } from 'jsonwebtoken'; // ()verificar o token
import authConfig from '@config/auth'; // arquivo de configuração de auth

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do tokenJWT
  const authHeader = request.headers.authorization; // Buscando o valor dento do cabeçalho
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // dividindo o bearer do token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload; // forçando a declaração de tipos
    // Essa request está em @types, onde fizemos um override de tipos, inserindo um novo valor ao request
    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
