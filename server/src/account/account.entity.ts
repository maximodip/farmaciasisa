import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  creationDate: Date;

  @Column({ type: 'enum', enum: ['pendiente', 'pagado'], default: 'pendiente' })
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.accounts, {
    nullable: false,
  })
  customer: Customer;

  @OneToMany(() => Product, (product) => product)
  products: Product[];

  @Column('decimal')
  total: number;
}
