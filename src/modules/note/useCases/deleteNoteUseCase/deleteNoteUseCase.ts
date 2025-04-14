import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/noteRepository';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this note',
      );
    }

    await this.noteRepository.delete(noteId);
  }
}
