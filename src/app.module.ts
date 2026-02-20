import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
