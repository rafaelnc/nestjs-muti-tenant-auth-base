// company.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from 'src/tenant/tenant.entity';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly tenantService: TenantService,
  ) {}

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    // Associe o tenant à empresa
    const newCompany = this.companyRepository.create({
      ...companyData,
    });
    try {
      const savedCompany = await this.companyRepository.save(newCompany);

      if (savedCompany) {
        // Crie um novo tenant
        const newTenant = new Tenant();
        newTenant.host = companyData.name;
        newTenant.name = companyData.name + '_' + uuidv4().replace(/-/g, '_');
        newTenant.company = savedCompany;

        await this.tenantService.save(newTenant);
        return savedCompany;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findCompanyById(id: number): Promise<Company | undefined> {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async updateCompany(
    id: number,
    companyData: Partial<Company>,
  ): Promise<Company | undefined> {
    await this.companyRepository.update(id, companyData);
    return this.findCompanyById(id);
  }

  async deleteCompany(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
