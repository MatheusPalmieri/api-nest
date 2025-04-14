import { Note } from '../entities/note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract findById(noteId: string): Promise<Note | null>;
  abstract findManyByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Note[]>;
  abstract update(note: Note): Promise<void>;
  abstract delete(noteId: string): Promise<void>;
}
