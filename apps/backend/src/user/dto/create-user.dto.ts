// create-user.dto.ts
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
