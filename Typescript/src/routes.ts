import { Request, Response} from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response){
  const user = createUser({
    email: 'gabs@gmail.com',
    password: '1234',
    techs: ['node', 'react']
  })

  return response.json({ message: "Hello"})
}