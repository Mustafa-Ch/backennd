
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('google_calendar_tokens')
export class GoogleCalendarToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  scope: string;

  @Column()
  tokenType: string;

  @Column()
  expiryDate: number;

  @ManyToOne(() => User, (user) => user.googleTokens, { onDelete: 'CASCADE' })
  user: User;
}
