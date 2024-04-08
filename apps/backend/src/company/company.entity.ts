// company.entity.ts
import { Tenant } from 'src/tenant/tenant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  cnpj_cpf: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip_code: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;
}
