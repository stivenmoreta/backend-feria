import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from './entities/store.entity';

import { CreateStoreInput, UpdateStoreInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(createStoreInput: CreateStoreInput, user: User): Promise<Store> {
    const newStore = this.storeRepository.create({
      ...createStoreInput,
      user: { id: user.id },
    });

    return await this.storeRepository.save(newStore);
  }

  async findAll({
    limit,
    offset,
    search,
  }: PaginationWithSearch,user:User): Promise<Store[]> {

    const queryBuilder = this.storeRepository
      .createQueryBuilder('store')
      .where('store.user.id = :userId', { userId: user.id })
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeRepository.findOneBy({ id });

    if (!store) throw new NotFoundException(`store with id: ${id} not found`);

    return store;
  }

  async 

  async update(id: string, updateStoreInput: UpdateStoreInput): Promise<Store> {
    const store = await this.storeRepository.preload(UpdateStoreInput);

    if (!store) throw new NotFoundException(`store with id: ${id} not found`);

    return this.storeRepository.save(store);
  }

  async remove(id: string): Promise<Store> {
    const store = await this.findOne(id);

    await this.storeRepository.remove(store);

    return { ...store, id };
  }

  async storeCount(): Promise<number> {
    return await this.storeRepository.count();
  }
}
