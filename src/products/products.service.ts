import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductInput, UpdateProductInput } from './dto';

import { Product } from './entities/product.entity';
import { PaginationWithSearch } from '../common/dto';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({ categoryId, ...res }: CreateProductInput) {
    const newCategory = this.productRepository.create({
      ...res,
      category: { id: categoryId },
    });

    return await this.productRepository.save(newCategory);
  }

  async findAllByUser(
    { limit, offset, search }: PaginationWithSearch,
    user: User,
  ) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .innerJoin('category.store', 'store')
      .where('store.user.id = :userId', { userId: user.id })
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(category.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async findAllByCategory(
    { limit, offset, search }: PaginationWithSearch,
    category: Category,
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.category.id = :categoryId', { categoryId: category.id })
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(category.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  findOne(id: string): Promise<Product> {
    const product = this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`category with id: ${id} not found`);

    return product;
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
