import { HttpStatus } from '@nestjs/common';
import { AppException, AppExceptionProps } from './appException';

interface IncorrectValuesExceptionProps {
  fields: AppExceptionProps['fields'];
}

export class IncorrectValuesException extends AppException {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: 'Invalid data',
      status: HttpStatus.BAD_REQUEST,
      fields,
    });
  }
}
