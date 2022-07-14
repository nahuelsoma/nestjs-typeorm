import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// PrimaryGeneratedColumn is used to auto generate the primary key (id)
// Column is used to generate a new column
// Entity is used to define an entity for TypeORM

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  // TS suggest possible values when filling each parameter. Use auto complete.

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  // Add creation date
  @CreateDateColumn({
    type: 'timestamptz', // Add timestamp with time zone
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  // Add modified date
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
