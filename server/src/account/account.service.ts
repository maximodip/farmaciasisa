import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    return this.accountRepository.find({ relations: ['customer', 'products'] });
  }

  create(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }
}
