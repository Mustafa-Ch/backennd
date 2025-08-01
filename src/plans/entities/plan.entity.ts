import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  title: string; // e.g. "Perfect for the everyday organizer..."

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null; // Free plan = null

  @Column({ default: false })
  isFree: boolean;

  @Column({ default: false })
  isInviteOnly: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  bookingLimit: number; // 3 for Access, 0 = Unlimited

  @Column({ type: 'simple-array', nullable: true })
  features: string[]; // Short string list of included features

  @Column({ type: 'text', nullable: true })
  tagline: string; // “Plan beautifully, without the noise.”

  @Column({ default: 'Begin with Access' })
  ctaLabel: string; // “Unlock Reserve”, etc.

  @Column({ default: 'USD' })
  currency: string;

  @Column({ default: 'monthly' })
  billingCycle: 'monthly' | 'yearly';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
