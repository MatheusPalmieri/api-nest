import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyNoteUseCase/getNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/CreateNoteBody';
import { EditNoteBody } from './dtos/EditNoteBody';
import { NoteViewModel } from './viewModels/NoteViewModel';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNoteUseCase: GetManyNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;
    const userId = request.user.id;

    const note = await this.createNoteUseCase.execute({
      title,
      description,
      userId,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getManyNote(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = request.user.id;

    const notes = await this.getManyNoteUseCase.execute({
      userId,
      page,
      limit,
    });

    return notes.map((note) => NoteViewModel.toHttp(note));
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const userId = request.user.id;

    const note = await this.getNoteUseCase.execute({
      userId,
      noteId,
    });

    return NoteViewModel.toHttp(note);
  }

  @Patch(':noteId')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('noteId') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { title, description } = body;
    const userId = request.user.id;

    const note = await this.editNoteUseCase.execute({
      title,
      description,
      userId,
      noteId,
    });

    return NoteViewModel.toHttp(note);
  }

  @Delete(':noteId')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('noteId') noteId: string,
  ) {
    const userId = request.user.id;

    await this.deleteNoteUseCase.execute({
      userId,
      noteId,
    });
  }
}
