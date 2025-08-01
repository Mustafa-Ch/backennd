import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { getAuthUrl, getTokens } from '../../utils/googleAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleCalendarToken } from './entities/google-calendar.entity';
import { User } from '../user/entities/user.entity';

@Controller('api/auth/google')
export class GoogleCalendarController {
  constructor(
    @InjectRepository(GoogleCalendarToken)
    private readonly tokenRepo: Repository<GoogleCalendarToken>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get()
  async redirectToGoogle(@Res() res: Response) {
    const url = getAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async googleCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tokens = await getTokens(code);

   
const userId = (req as any).user?.id;

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) return res.status(404).json({ error: 'User not found' });

const token = this.tokenRepo.create({
  accessToken: tokens.access_token as string,
  refreshToken: tokens.refresh_token as string,
  scope: tokens.scope as string,
  tokenType: tokens.token_type as string,
  expiryDate: tokens.expiry_date as number,
  user: user,
});




    await this.tokenRepo.save(token);

    res.redirect('/success');
  }
}
