import { UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { ValidateUserUseCase } from './validateUserUseCase';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw erro when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = '123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
