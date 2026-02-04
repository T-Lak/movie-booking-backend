import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsModule } from './shows/shows.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'movie_app',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ShowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
