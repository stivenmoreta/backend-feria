import { Injectable } from '@nestjs/common';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { PaginationArgs } from '../common/dto/pagination.args';
import { PaginationSalesArgs } from './dto/pagination-sales.args';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  create(createSaleInput: CreateSaleInput) {
    return 'This action adds a new sale';
  }

  async findAllByTradeProductId(
    { limit, offset, fecha, paymentMethod }: PaginationSalesArgs,
    tradeProductId: string,
  ): Promise<Sale[]> {

    const queryBuilder = this.saleRepository
      .createQueryBuilder('sales')
      .where('sales.tradeProduct.id = :tradeProductId', { tradeProductId })
      .take(limit)
      .skip(offset);

    if (fecha) {
      queryBuilder.andWhere('sales.fecha = :fecha', { fecha });
    }

    if (paymentMethod) {
      queryBuilder.andWhere('sales.paymentMethod = :paymentMethod', { paymentMethod });
    }

    return await queryBuilder.getMany();
  }

  findAll(id: string) {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleInput: UpdateSaleInput) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
