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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyNoteUseCase/getNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/CreateNoteBody';
import { EditNoteBody } from './dtos/EditNoteBody';
import { NoteViewModel } from './viewModels/NoteViewModel';

@ApiTags('Notes')
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
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
  @ApiOperation({ summary: 'List all notes for authenticated user' })
  @ApiResponse({ status: 200, description: 'Returns list of notes' })
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
  @ApiOperation({ summary: 'Get a specific note by ID' })
  @ApiResponse({ status: 200, description: 'Returns the note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
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
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({ status: 200, description: 'Note updated successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
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
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
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
