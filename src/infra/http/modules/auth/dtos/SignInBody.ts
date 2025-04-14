import { ApiProperty } from '@nestjs/swagger';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class SignInBody {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmailCustom()
  @IsStringCustom()
  @IsNotEmptyCustom()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsStringCustom()
  @IsNotEmptyCustom()
  password: string;
}
