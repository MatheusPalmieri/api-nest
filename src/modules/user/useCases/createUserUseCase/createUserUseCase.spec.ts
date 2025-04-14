import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUserCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUserCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUserCase.execute({
      name: 'Matheus',
      email: 'matheus@email.com',
      password: '123',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('should be able to create a new user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123';

    const user = await createUserUserCase.execute({
      name: 'Matheus',
      email: 'matheus@email.com',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
