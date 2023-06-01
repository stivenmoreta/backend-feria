import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';

import { CreateCategoryInput, UpdateCategoryInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create({ storeId, ...res }: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      ...res,
      store: { id: storeId },
    });

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(
    { limit, offset, search }: PaginationWithSearch,
    store: Store,
  ): Promise<Category[]> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.store', 'store')
      .where('store.id = :storeId', { storeId: store.id })
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(category.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`category with id: ${id} not found`);

    return category;
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoryRepository.preload(updateCategoryInput);

    if (!category)
      throw new NotFoundException(`category with id: ${id} not found`);

    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);

    return { ...category, id };
  }

  async categoryCount(): Promise<number> {
    return await this.categoryRepository.count();
  }
}
