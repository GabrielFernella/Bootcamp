// Representação de como um dado é salvo na aplicação

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Um model que será salvo no banco de dados

import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer'; // biblioteca para editar campos das classes
import upload from '@config/upload';

@Entity('users') // insira o nome da tabela
class User {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
