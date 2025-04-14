import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { Public } from './decorators/isPublic';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthRequestModel } from './models/authRequestModel';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'User authentication' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@email.com',
        password: '123456',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
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
}
