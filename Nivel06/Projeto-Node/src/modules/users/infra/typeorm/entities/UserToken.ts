// Representação de como um dado é salvo na aplicação
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'; // Um model que será salvo no banco de dados

@Entity('user_tokens') // insira o nome da tabela
class UserToken {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
