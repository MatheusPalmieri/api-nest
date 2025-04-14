import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class CreateNoteBody {
  @ApiProperty({ example: 'Meeting Notes' })
  @IsStringCustom()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Discussion points for the team meeting',
    required: false,
  })
  @IsStringCustom()
  @IsOptional()
  description?: string;
}
