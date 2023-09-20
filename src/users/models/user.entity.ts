import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  email: string;

  @Column({ default: false })
  isAdmin: boolean;
}
