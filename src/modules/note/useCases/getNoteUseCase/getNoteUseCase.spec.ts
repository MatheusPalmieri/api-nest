import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetNoteUseCase } from './getNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await getNoteUseCase.execute({
        userId: 'fake-user-id',
        noteId: 'fake-note-id',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await getNoteUseCase.execute({
        userId: 'fake-user-id',
        noteId: note.id,
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
