// entities/tenant.entity.ts
import { Company } from 'src/company/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  host: string;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Company, (company) => company.tenant) // Defina o relacionamento inverso em Company
  company: Company;
}
