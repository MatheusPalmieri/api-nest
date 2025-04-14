import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const user = new User({
      name,
      email,
      password: await hash(password, 10),
    });

    this.userRepository.create(user);

    return user;
  }
}
