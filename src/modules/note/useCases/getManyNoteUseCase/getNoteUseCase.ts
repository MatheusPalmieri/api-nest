import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/noteRepository';

interface GetManyNoteRequest {
  userId: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class GetManyNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, page, limit }: GetManyNoteRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentLimit = Number(limit) || DEFAULT_LIMIT;

    const notes = await this.noteRepository.findManyByUserId(
      userId,
      currentPage,
      currentLimit,
    );

    return notes;
  }
}
