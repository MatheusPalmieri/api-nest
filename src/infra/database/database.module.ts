import { Module } from '@nestjs/common';
import { NoteRepository } from 'src/modules/note/repositories/noteRepository';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [NoteRepository, UserRepository],
})
export class DatabaseModule {}
