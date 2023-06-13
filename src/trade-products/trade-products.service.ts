import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TradeProduct } from './entities/trade-product.entity';

import { CreateTradeProductInput,UpdateTradeProductInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';


@Injectable()
export class TradeProductsService {
  constructor(
    @InjectRepository(TradeProduct)
    private tradeProductRepository: Repository<TradeProduct>,
  ) {}

  async create({
    productId,
    ...res
  }: CreateTradeProductInput): Promise<TradeProduct> {
    const newProduct = this.tradeProductRepository.create({
      product: { id: productId },
      ...res,
    });

    return await this.tradeProductRepository.save(newProduct);
  }

  async findOne(id: string): Promise<TradeProduct> {
    const tradeProduct = await this.tradeProductRepository.findOneBy({ id });

    if (!tradeProduct)
      throw new NotFoundException(`tradeProduct with id: ${id} not found`);

    return tradeProduct;
  }

  async findAllByProductId(
    { limit, offset, search }: PaginationWithSearch,
    productId: string,
  ): Promise<TradeProduct[]> {
    const queryBuilder = this.tradeProductRepository
      .createQueryBuilder('tradeProduct')
      .where('tradeProduct.product.id = :productId', { productId })
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(category.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async update(
    id: string,
    updateTradeProductInput: UpdateTradeProductInput,
  ): Promise<TradeProduct> {
    const tradeProduct = await this.tradeProductRepository.preload(
      updateTradeProductInput,
    );

    if (!tradeProduct)
      throw new NotFoundException(`tradeProduct with id: ${id} not found`);

    return this.tradeProductRepository.save(tradeProduct);
  }

  async remove(id: string): Promise<TradeProduct> {
    const tradeProduct = await this.findOne(id);

    await this.tradeProductRepository.softDelete(id);

    return tradeProduct;
  }
}
