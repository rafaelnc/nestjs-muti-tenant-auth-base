import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  async createDB(): Promise<string> {
    const dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
    });

    await dataSource.initialize();
    await dataSource.query(`CREATE DATABASE Test2`);
    return 'Created';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
