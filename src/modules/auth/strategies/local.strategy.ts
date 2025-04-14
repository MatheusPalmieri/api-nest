import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserUseCase } from '../useCases/validateUserUseCase/validateUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.validateUserUseCase.execute({
      email,
      password,
    });
  }
}
