import { Chat} from '../../chat/entities/chat.entity';
import { GoogleCalendarToken } from 'src/google-calendar/entities/google-calendar.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  normalizeEmail() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
  @OneToMany(() => GoogleCalendarToken, (token) => token.user)
  googleTokens: GoogleCalendarToken[];
}
