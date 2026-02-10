import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
