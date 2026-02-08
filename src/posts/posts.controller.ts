import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    return await this.postsService.findAll();
  }

  @Post()
  async create(@Body('content') content: string) {
    if (!content || content.length > 300) {
      throw new BadRequestException(
        'Content must be between 1 and 300 characters.',
      );
    }
    return await this.postsService.create(content);
  }
}
