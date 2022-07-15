import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // for many to one relation
  ManyToMany, // for many to many relation
  JoinTable, // for many to many relation
  Index,
  JoinColumn,
} from 'typeorm';
// PrimaryGeneratedColumn is used to auto generate the primary key (id)
// Column is used to generate a new column
// Entity is used to define an entity for TypeORM

import { Brand } from './brand.entity'; // to perform a many to one relationship
import { Category } from './category.entity'; // to perform a many to many relationship

@Entity({ name: 'products' })
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // TS suggest possible values when filling each parameter. Use auto complete.
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  // Add creation date
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz', // Add timestamp with time zone
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  // Add modified date
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    // Must be present at only one of the two entities
    name: 'product_has_categories', // table name
    joinColumn: {
      name: 'product_id', // this file (entity, table) column name
    },
    inverseJoinColumn: {
      name: 'category_id', // other table column name
    },
  })
  categories: Category[];
}
