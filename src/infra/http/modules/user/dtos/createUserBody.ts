import { ApiProperty } from '@nestjs/swagger';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

export class CreateUserBody {
  @ApiProperty({ example: 'John Doe' })
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmailCustom()
  @IsStringCustom()
  @IsNotEmptyCustom()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
