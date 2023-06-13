import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { User } from 'src/users/entities/user.entity';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

import { CreateProductInput, UpdateProductInput } from './dto';
import { PaginationWithSearch } from '../common/dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({ categoryId, ...res }: CreateProductInput): Promise<Product> {
    const newCategory = this.productRepository.create({
      ...res,
      category: { id: categoryId },
    });

    return await this.productRepository.save(newCategory);
  }

  async findAllByUser(
    { limit, offset, search }: PaginationWithSearch,
    user: User,
  ): Promise<Product[]>{
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

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`product with id: ${id} not found`);

    return product;
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.preload(updateProductInput);

    if (!product) throw new NotFoundException(`product with id: ${id} not found`);

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const sale = await this.findOne(id);

    await this.productRepository.delete({ id });

    return { ...sale, id };
  }
}
