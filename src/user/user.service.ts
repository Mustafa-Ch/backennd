
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private configService: ConfigService,
  ) {}

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      firstName,
      lastName,
      email,
      password: hashed,
    });
    
    return this.userRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is not defined in environment');

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });

   

    return { token, user };
  }

  verifyToken(token: string) {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret)
          throw new Error('JWT_SECRET is not defined in environment');

    return jwt.verify(token, secret);
  }
}
