import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phoneNumber: string;
  @Column({
    type: 'enum',
    enum: ['CLIENT', 'NAIL_TECH', 'ADMIN'],
    default: 'ADMIN',
  })
  role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN';
  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
