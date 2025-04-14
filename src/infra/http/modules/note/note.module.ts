import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyNoteUseCase/getNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { NoteController } from './note.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    GetNoteUseCase,
    GetManyNoteUseCase,
    EditNoteUseCase,
    DeleteNoteUseCase,
  ],
})
export class NoteModule {}
