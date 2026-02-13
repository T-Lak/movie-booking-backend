import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../common/enums/role.enum';

export async function seedUser(userRepo: Repository<User>) {
  const user: User = userRepo.create({
    email: "admin@movie_app.com",
    passwordHash: await bcrypt.hash("admin1", 10),
    role: Role.ADMIN,
  })

  await userRepo.save(user);
}