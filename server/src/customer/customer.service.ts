import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['accounts'] });
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { id },
      relations: ['accounts'],
    }); // This will return the first customer in the database
  }

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async update(id: number, customer: Customer): Promise<void> {
    await this.customerRepository.update(id, customer);
  }
}
