// Representação de como um dado é salvo na aplicação
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Um model que será salvo no banco de dados

@Entity('appointments') // insira o nome da tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
