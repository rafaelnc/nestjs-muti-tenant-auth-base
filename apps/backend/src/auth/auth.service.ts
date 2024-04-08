//auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(email: string, password: string): Promise<any> {
    const user = (await this.userService.findByEmail(email)) || false;

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return await this.gerarToken(user);
    }

    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: any) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: process.env.AUTH_SECRET,
          expiresIn: '2h',
        },
      ),
    };
  }
}
