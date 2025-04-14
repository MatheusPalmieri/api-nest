import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/note';
import { NoteRepository } from 'src/modules/note/repositories/noteRepository';
import { PrismaNoteMapper } from '../mappers/PrismaNoteMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }

  async findById(noteId: string): Promise<Note | null> {
    const noteRaw = await this.prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!noteRaw) {
      return null;
    }

    return PrismaNoteMapper.toDomain(noteRaw);
  }

  async findManyByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Note[]> {
    const notesRaw = await this.prisma.note.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
    });

    return notesRaw.map(PrismaNoteMapper.toDomain);
  }

  async update(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.update({
      where: { id: note.id },
      data: noteRaw,
    });
  }

  async delete(noteId: string): Promise<void> {
    await this.prisma.note.delete({
      where: { id: noteId },
    });
  }
}
