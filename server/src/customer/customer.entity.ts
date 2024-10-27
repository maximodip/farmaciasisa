import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  dni: number;

  @Column({ type: 'varchar', length: 15 }) // Adjust length as needed
  phone: string;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];
}
