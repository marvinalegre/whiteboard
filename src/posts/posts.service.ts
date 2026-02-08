import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.query('SELECT * FROM posts ORDER BY created_at DESC');
  }

  async create(content: string) {
    return this.db.run('INSERT INTO posts (content) VALUES (?)', [content]);
  }
}
