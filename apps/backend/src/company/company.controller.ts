// company.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() companyData: Partial<Company>): Promise<Company> {
    return await this.companyService.createCompany(companyData);
  }

  @Get()
  async findAllCompanies(): Promise<Company[]> {
    return await this.companyService.findAllCompanies();
  }

  @Get(':id')
  async findCompanyById(@Param('id') id: number): Promise<Company | undefined> {
    return await this.companyService.findCompanyById(id);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: number,
    @Body() companyData: Partial<Company>,
  ): Promise<Company | undefined> {
    return await this.companyService.updateCompany(id, companyData);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: number): Promise<void> {
    await this.companyService.deleteCompany(id);
  }
}
