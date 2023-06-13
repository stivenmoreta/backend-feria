import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';

import { User } from '../users/entities/user.entity';
import { Sale } from '../sales/entities/sale.entity';
import { TradeProduct } from './entities/trade-product.entity';
import { SalesService } from '../sales/sales.service';
import { TradeProductsService } from './trade-products.service';
import { CreateTradeProductInput,UpdateTradeProductInput } from './dto';
import { PaginationSalesArgs } from '../sales/dto/pagination-sales.args';
import { PaymentMethodArgs } from '../sales/dto/paymen-method.args';

import { JwtAuthGqlGuard } from 'src/auth/guards';
import { CurrentUserGql } from 'src/auth/decorators';
import { ValidRoles as VR } from 'src/auth/guards/interfaces';

@Resolver(() => TradeProduct)
@UseGuards(JwtAuthGqlGuard)
export class TradeProductsResolver {
  constructor(
    private readonly tradeProductsService: TradeProductsService,
    private readonly salesService: SalesService,
  ) {}

  @Mutation(() => TradeProduct, { name: 'createTradeProduct' })
  createTradeProduct(
    @Args('createTradeProductInput')
    createTradeProductInput: CreateTradeProductInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<TradeProduct> {
    return this.tradeProductsService.create(createTradeProductInput);
  }

  @Mutation(() => TradeProduct, { name: 'updateTradeProduct' })
  updateTradeProduct(
    @Args('updateTradeProductInput')
    updateTradeProductInput: UpdateTradeProductInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<TradeProduct> {
    return this.tradeProductsService.update(
      updateTradeProductInput.id,
      updateTradeProductInput,
    );
  }

  @Mutation(() => TradeProduct, { name: 'removeTradeProduct' })
  removeTradeProduct(
    @Args('id', { type: () => ID },ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<TradeProduct>{
    return this.tradeProductsService.remove(id);
  }

  @ResolveField(() => [Sale], { name: 'sales' })
  getSalesByTradeProduct(
    @Parent() tradeProduct: TradeProduct,
    @Args() paginationSalesArgs: PaginationSalesArgs,
    @CurrentUserGql() user: User,
  ): Promise<Sale[]> {
    return this.salesService.findAllByTradeProductId(
      paginationSalesArgs,
      tradeProduct.id,
    );
  }

  @ResolveField(() => Number, { name: 'countSale' })
  getCountSale(
    @Parent() tradeProduct: TradeProduct,
    @CurrentUserGql() user: User,
  ): Promise<number> {
    return this.salesService.countSalesByTradeProductId(tradeProduct.id);
  }

  @ResolveField(() => Number, { name: 'countSalePaymentMethod' })
  getCountSalePaymentMethod(
    @Parent() tradeProduct: TradeProduct,
    @Args() paymentMethodArgs: PaymentMethodArgs,
    @CurrentUserGql() user: User,
  ): Promise<number> {
    return this.salesService.countPaymentMethodByTradeProductId(
      paymentMethodArgs.paymentMethod,
      tradeProduct.id,
    );
  }
}
