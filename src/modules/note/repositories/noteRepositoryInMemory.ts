import { Note } from '../entities/note';
import { NoteRepository } from './noteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(noteId: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === noteId);
    return note || null;
  }

  async findManyByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Note[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return this.notes
      .filter((note) => note.userId === userId)
      .slice(startIndex, endIndex);
  }

  async update(note: Note): Promise<void> {
    const noteIndex = this.notes.findIndex((n) => n.id === note.id);
    if (noteIndex !== -1) {
      this.notes[noteIndex] = note;
    }
  }

  async delete(noteId: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }
}
