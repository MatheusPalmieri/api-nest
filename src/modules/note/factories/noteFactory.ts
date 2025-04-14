import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Note Title',
      description: 'Note Description',
      userId: '1',
      ...override,
    },
    id,
  );
};
