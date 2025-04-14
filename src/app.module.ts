import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuthGuard.guard';
import { UserModule } from './infra/http/modules/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
