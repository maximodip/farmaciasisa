import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() customer: Customer): Promise<void> {
    return this.customerService.update(id, customer);
  }
}
