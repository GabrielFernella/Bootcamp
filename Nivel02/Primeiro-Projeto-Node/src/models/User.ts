// Representação de como um dado é salvo na aplicação
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Um model que será salvo no banco de dados

@Entity('users') // insira o nome da tabela
class User {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
