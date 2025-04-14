import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class EditNoteBody {
  @ApiProperty({ example: 'Updated Meeting Notes' })
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @ApiProperty({ example: 'Updated discussion points', required: false })
  @IsStringCustom()
  @IsOptional()
  description?: string;
}
