import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/modules/note/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    title,
    description,
    userId,
    createdAt,
  }: Note): NoteRaw {
    return {
      id,
      title,
      description,
      userId,
      createdAt,
    };
  }

  static toDomain({
    id,
    title,
    description,
    userId,
    createdAt,
  }: NoteRaw): Note {
    return new Note(
      {
        title,
        description,
        userId,
        createdAt,
      },
      id,
    );
  }
}
