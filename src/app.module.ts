import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ScheduleModule.forRoot(), PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
