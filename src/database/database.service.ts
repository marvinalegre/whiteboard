import { Injectable, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: any;

  onModuleInit() {
    // Open the connection
    this.db = new Database('/var/lib/whiteboard/whiteboard.db');

    // Performance optimization for SQLite
    this.db.pragma('journal_mode = WAL');

    // Initialize Schema
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL CHECK (length(content) <= 300),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  // better-sqlite3 is synchronous, so no need for 'async' here,
  // but we keep the return type consistent for the service.
  run(sql: string, params: any[] = []) {
    const stmt = this.db.prepare(sql);
    const result = stmt.run(params);
    return { id: result.lastInsertRowid };
  }

  query(sql: string, params: any[] = []) {
    const stmt = this.db.prepare(sql);
    return stmt.all(params);
  }
}
