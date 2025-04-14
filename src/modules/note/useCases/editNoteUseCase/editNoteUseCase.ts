import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this note',
      );
    }

    note.title = title;
    note.description = description || note.description;

    await this.noteRepository.update(note);

    return note;
  }
}
