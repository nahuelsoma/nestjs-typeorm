import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude() // Do not show this information on request - Need serializer in main.ts
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude() // Do not show this information on request - Need serializer in main.ts
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // extra custom column
  @Column({ type: 'int' })
  quantity: number;

  // relation to product
  @ManyToOne(() => Product)
  product: Product;

  // relation to order
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
