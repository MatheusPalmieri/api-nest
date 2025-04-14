import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class CreateNoteBody {
  @IsStringCustom()
  @IsNotEmpty()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description?: string;
}
