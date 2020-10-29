import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function Hello(request: Request, response: Response) {
  const user = createUser({
    name: 'teste',
    email: 'teste@example.com',
    password: '123456',
    techs: ['node', 'react', { title: 'JavaScript', experience: 100 }],
  });
  return response.json({ message: 'Hello' });
}
