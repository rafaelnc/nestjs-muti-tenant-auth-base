// tenant.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Connection, DataSource } from 'typeorm';
import { TenantService } from './tenant.service'; // Importe o serviço do tenant
import { Tenant } from './tenant.entity';
import { User } from 'src/user/user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tenant: Tenant;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private connection: Connection,
    private readonly tenantService: TenantService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers['x-tenant-host']?.toString(); // Obtém o host do tenant do header

    await this.connection.query(`USE ${process.env.DB_DATABASE}`);

    if (!host) {
      return res.status(400).json({ message: 'Host header is required' });
    }

    try {
      // Busca as informações do tenant com base no host

      const tenant = await this.tenantService.findByHost(host);

      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      // Define o esquema correto com base no ID do tenant
      // Define o esquema correto com base no ID do tenant
      const schema = `${tenant.name}`;
      await this.connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);

      const connection = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: tenant.name,
        entities: [User],
        synchronize: true,
      });

      await connection.connect();

      await this.connection.query(`USE ${schema}`);

      // Adiciona as informações do tenant ao objeto de requisição para serem acessadas em outras rotas
      req.tenant = tenant;

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error loading tenant information' });
    }
  }
}
