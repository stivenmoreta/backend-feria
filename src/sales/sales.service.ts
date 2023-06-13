import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from './entities/sale.entity';
import { TradeProduct } from '../trade-products/entities/trade-product.entity';
import { CreateSaleInput, UpdateSaleInput, PaginationSalesArgs } from './dto';
import { PaymentMethods } from './enum/payment-method.enum';
import { Operation } from '../common/enum/stage.enum copy';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(TradeProduct)
    private readonly tradeProductRepository: Repository<TradeProduct>,
  ) {}

  async create({ tradeProductId, ...res }: CreateSaleInput): Promise<Sale> {
    const newSale = this.saleRepository.create({
      ...res,
      tradeProduct: { id: tradeProductId },
    });

    await this.updateStock(tradeProductId, Operation.res,1);

    return await this.saleRepository.save(newSale);
  }

  
  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleRepository.findOneBy({id});

    if (!sale) throw new NotFoundException(`sale with id: ${id} not found`);

    return sale;

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
      queryBuilder.andWhere('sales.paymentMethod = :paymentMethod', {
        paymentMethod,
      });
    }

    return await queryBuilder.getMany();
  }

  async countSalesByTradeProductId(tradeProductId: string): Promise<number> {
    return await this.saleRepository.count({
      where: {tradeProduct: { id: tradeProductId } },
    });
  }

  async countPaymentMethodByTradeProductId(payMethod: PaymentMethods, tradeProductId: string): Promise<number> {
    return await this.saleRepository.count({
      where: { paymentMethod: payMethod, tradeProduct: { id: tradeProductId } },
    });
  }

  async update(id: string, updateSaleInput: UpdateSaleInput): Promise<Sale> {
    const sale = await this.saleRepository.preload(updateSaleInput);

    if (!sale) throw new NotFoundException(`sale with id: ${id} not found`);

    return await this.saleRepository.save(sale);
  }


  async updateStock(tradeProductId: string, operation:Operation, quantity: number): Promise<TradeProduct> {

    const tradeProduct = await this.tradeProductRepository.findOneBy({id: tradeProductId});

    tradeProduct.stock = operation === Operation.sum ? tradeProduct.stock + quantity : tradeProduct.stock - quantity;

    return this.tradeProductRepository.save(tradeProduct);
  }


  async remove(id: string): Promise<Sale> {
    const sale = await this.findOne(id);

    await this.saleRepository.softDelete({ id });

    await this.updateStock(sale.tradeProduct.id, Operation.sum,1);

    return { ...sale, id };
  }
}
