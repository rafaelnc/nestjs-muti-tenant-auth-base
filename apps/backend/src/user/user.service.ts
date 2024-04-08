// user.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = this.userRepository.create(user);
    newUser.password = hash;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (foundUser) {
      throw new ConflictException('Email já cadastrado');
    }
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
