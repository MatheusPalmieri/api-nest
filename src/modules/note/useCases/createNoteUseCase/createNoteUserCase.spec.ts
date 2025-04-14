import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to create a new note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Test Note',
      userId: '1234',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
