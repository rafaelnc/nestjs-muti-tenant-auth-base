// tenant.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity'; // Importe a entidade do tenant

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async createTenant(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(data);
    return await this.tenantRepository.save(tenant);
  }

  async save(tenant: Tenant): Promise<Tenant> {
    return await this.tenantRepository.save(tenant);
  }

  async findByHost(host: string): Promise<Tenant | undefined> {
    return await this.tenantRepository.findOne({ where: { host } });
  }
}
