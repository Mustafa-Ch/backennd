import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('personal_preferences')
export class PersonalPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column('text', { array: true, default: '{}' })
  preferredCities: string[];

  @Column('text', { array: true, default: '{}' })
  preferredCuisine: string[];

  @Column({ nullable: true })
  diningStyle: string;

  @Column({ nullable: true })
  seatingPreferences: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
