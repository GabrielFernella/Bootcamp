// Representação de como um dado é salvo na aplicação

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // tipo de relacionamento
  JoinColumn,
} from 'typeorm'; // Um model que será salvo no banco de dados

import User from '@modules/users/infra/typeorm/entities/User';

/*

  Um para um (OneToOne)

  Um para * (OneToMany)

  * para * (ManyToMany)

*/

@Entity('appointments') // insira o nome da tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  provider_id: string;

  // Passando o relacionamento
  @ManyToOne(() => User) // Funcição de qual model o ORM precisa usar
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User) // Funcição de qual model o ORM precisa usar
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
