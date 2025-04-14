import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteRepository } from '../../repositories/noteRepository';

interface EditNoteRequest {
  title: string;
  description?: string;
  noteId: string;
  userId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, noteId, userId }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (note.userId !== userId) {
      throw new NoteWithoutPermissionException({ actionName: 'edit' });
    }

    note.title = title;
    note.description = description || note.description;

    await this.noteRepository.update(note);

    return note;
  }
}
