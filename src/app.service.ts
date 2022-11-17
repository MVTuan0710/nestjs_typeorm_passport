import { Injectable } from '@nestjs/common';
import { AccountEntity } from './module/account/account.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AccountEntity)
    readonly userRepository: Repository<AccountEntity>
  ) {}
}