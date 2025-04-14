import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteRepository } from '../../repositories/noteRepository';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (note.userId !== userId) {
      throw new NoteWithoutPermissionException({ actionName: 'get' });
    }

    return note;
  }
}
