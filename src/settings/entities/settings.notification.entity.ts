import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum PushNotificationPreference {
  TIMELY = 'timely',
  RELEVANT = 'relevant',
  OVERWHELMING = 'overwhelming',
}

@Entity('notification_settings')
export class NotificationSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ default: true })
  emailAlerts: boolean;

  @Column({ default: false })
  smsAlerts: boolean;

  @Column({
    type: 'enum',
    enum: PushNotificationPreference,
    default: PushNotificationPreference.TIMELY,
  })
  pushNotification: PushNotificationPreference;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
