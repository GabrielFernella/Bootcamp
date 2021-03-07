// Esse arquivo é responsável por fazer as importações de injeção de dependência

import { container } from 'tsyringe';

import '@modules/users/providers'; // alterado no eslint

import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

// Utilizamos o singleton que instancie nossa classe uma única vez durante todo o siclo de vida da aplicação

container.registerSingleton<IAppointmentsRepository>( // A interface utilizada para guia
  'AppointmentsRepository', // Como deve ser chamada o inject

  AppointmentsRepository, // O respectivo repositório de referencia
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',

  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',

  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',

  NotificationsRepository,
);
