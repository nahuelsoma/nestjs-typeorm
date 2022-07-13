import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

enum CategoryName {
  FOOD = 'Food',
  TRAVEL = 'Travel',
  GAMES = 'Games',
  HEALTH = 'Health',
}

@Entity({ name: 'Categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CategoryName })
  category: CategoryName;
}
