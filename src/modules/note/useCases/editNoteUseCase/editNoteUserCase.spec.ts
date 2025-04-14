import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { EditNoteUseCase } from './editNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const newTitle = 'new-title';
    const newDescription = 'new-description';

    await editNoteUseCase.execute({
      title: newTitle,
      description: newDescription,
      userId: user.id,
      noteId: note.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(newTitle);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(newDescription);
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fake-title',
        description: 'fake-description',
        userId: 'fake-user-id',
        noteId: 'fake-note-id',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fake-title',
        description: 'fake-description',
        userId: 'fake-user-id',
        noteId: note.id,
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });
});
