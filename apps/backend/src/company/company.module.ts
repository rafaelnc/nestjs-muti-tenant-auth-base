import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from 'src/tenant/tenant.entity';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Tenant])],
  controllers: [CompanyController],
  providers: [CompanyService, TenantService],
})
export class CompanyModule {}
