import { HttpStatus } from '@nestjs/common';
import { AppException } from './appException';

export class InvalidAccessTokenException extends AppException {
  constructor() {
    super({
      message: 'Invalid access token',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
