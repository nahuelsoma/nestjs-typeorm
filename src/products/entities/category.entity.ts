import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}

// import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// enum CategoryName {
//   FOOD = 'Food',
//   TRAVEL = 'Travel',
//   GAMES = 'Games',
//   HEALTH = 'Health',
// }

// @Entity({ name: 'categories' })
// export class Category {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'enum', enum: CategoryName })
//   category: CategoryName;
// }
