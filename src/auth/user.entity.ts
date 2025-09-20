import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Ensure length is sufficient for hashed password (e.g., 255)

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
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
