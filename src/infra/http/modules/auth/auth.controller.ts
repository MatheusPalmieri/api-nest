import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUseCase } from 'src/modules/auth/signInUseCase/signInUseCase';
import { Public } from './decorators/isPublic';
import { LocalAuthGuard } from './guards/localAuthGuard.guard';
import { AuthRequestModel } from './models/authRequestModel';
import { AuthenticatedRequestModel } from './models/authenticatedRequestModel';

@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });

    return {
      token: access_token,
    };
  }

  @Get()
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
