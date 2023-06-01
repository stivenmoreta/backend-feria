import { Injectable } from '@nestjs/common';
import { CreateTradeProductInput } from './dto/create-trade-product.input';
import { UpdateTradeProductInput } from './dto/update-trade-product.input';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';
import { Product } from 'src/products/entities/product.entity';
import { TradeProduct } from './entities/trade-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TradeProductsService {
  constructor(
    @InjectRepository(TradeProduct)
    private tradeProductRepository: Repository<TradeProduct>,
  ) {}

  create(createTradeProductInput: CreateTradeProductInput) {
    return 'This action adds a new tradeProduct';
  }

  async findAllByProductId({limit,offset,search}: PaginationWithSearch,productId: string) {
    
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

  findOne(id: number) {
    return `This action returns a #${id} tradeProduct`;
  }

  update(id: number, updateTradeProductInput: UpdateTradeProductInput) {
    return `This action updates a #${id} tradeProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradeProduct`;
  }
}
