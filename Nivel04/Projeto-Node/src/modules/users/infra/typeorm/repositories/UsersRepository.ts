// Trabalha com os dados (Listar,Altear,Deletar..)
import { getRepository, Repository } from 'typeorm'; // Faz uma relação entre o repositório e o model

// Importando a interface para averiguar quais métodos precisam ser criados
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne(id); // Passando um parâmetro ele já pesquisa pelo id, não precisa colocar o where

    return findAppointment;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { email },
    });

    return findAppointment;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
