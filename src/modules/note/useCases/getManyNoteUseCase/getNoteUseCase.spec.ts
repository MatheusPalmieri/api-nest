import { makeUser } from 'src/modules/user/factories/userFactory';
import { Note } from '../../entities/note';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetManyNoteUseCase } from './getNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNoteUseCase: GetManyNoteUseCase;

describe('Get many note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyNoteUseCase = new GetManyNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to get many note by user', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user.id,
    });

    expect(result).toEqual(notes);
  });

  it('Should be able to get only user notes', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});
    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: index < 5 ? user1.id : user2.id }),
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user1.id,
    });

    expect(result).toHaveLength(5);
  });

  it('Should be able to control note limit', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user.id,
      limit: 5,
    });

    expect(result).toHaveLength(5);
  });

  it('Should be able to control notes page', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: user.id, title: index < 5 ? 'title 1' : 'title 2' }),
    );

    noteRepositoryInMemory.notes = notes;

    let result: Note[];

    result = await getManyNoteUseCase.execute({
      userId: user.id,
      limit: 5,
      page: 1,
    });

    expect(result[0].title).toBe('title 1');

    result = await getManyNoteUseCase.execute({
      userId: user.id,
      limit: 5,
      page: 2,
    });

    expect(result[0].title).toBe('title 2');
  });
});
