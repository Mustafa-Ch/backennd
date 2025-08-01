import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body, @Res({ passthrough: true }) res: Response) {
    const { firstName, lastName, email, password } = body;

    try {
      await this.authService.signup(firstName, lastName, email, password);

      const { token, user } = await this.authService.login(email, password);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return { message: 'Your account has been created.', user };
    } catch (error) {
      console.error('Signup error:', error.message || error);

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Signup failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const { email, password } = body;

    try {
      const { token, user } = await this.authService.login(email, password);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return { message: 'Logged in successfully', user };
    } catch (error) {
      console.error('Login error:', error.message || error);

      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: error.message || 'Login failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { message: 'Logged out successfully' };
  }
}
