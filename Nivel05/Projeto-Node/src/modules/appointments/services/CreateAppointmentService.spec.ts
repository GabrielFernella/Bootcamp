// Nesse arquivo criamos todos os nossos testes, Criamos nossa categoria e os testes unitários para nossa validação

import 'reflect-metadata';

import AppError from '@shared/errors/AppError'; // Arquivo de tratativa de erros
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService'; // Importamos nosso arquivo de Services para que possamos buscar nossos services

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

// describe cria uma categoria de testes
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // utilize o fakeRepository e passe para o contructor
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  // it === test
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });
    // espera que appoinment tenha um id
    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // espera que o resultado seja uma instancia de AppError
  });
});
