import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TradeProductsService } from './trade-products.service';
import { TradeProduct } from './entities/trade-product.entity';
import { CreateTradeProductInput } from './dto/create-trade-product.input';
import { UpdateTradeProductInput } from './dto/update-trade-product.input';
import { Sale } from 'src/sales/entities/sale.entity';
import { User } from 'src/users/entities/user.entity';
import { CurrentUserGql } from 'src/auth/decorators';
import { SalesService } from '../sales/sales.service';
import { PaginationSalesArgs } from 'src/sales/dto/pagination-sales.args';

@Resolver(() => TradeProduct)
export class TradeProductsResolver {
  constructor(
    private readonly tradeProductsService: TradeProductsService,
    private readonly salesService: SalesService,
  ) {}

  @Mutation(() => TradeProduct)
  createTradeProduct(
    @Args('createTradeProductInput')
    createTradeProductInput: CreateTradeProductInput,
  ) {
    return this.tradeProductsService.create(createTradeProductInput);
  }

  @Query(() => [TradeProduct], { name: 'tradeProducts' })
  findAll() {
    return; //his.tradeProductsService.findAll();
  }

  @Query(() => TradeProduct, { name: 'tradeProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tradeProductsService.findOne(id);
  }

  @Mutation(() => TradeProduct)
  updateTradeProduct(
    @Args('updateTradeProductInput')
    updateTradeProductInput: UpdateTradeProductInput,
  ) {
    return this.tradeProductsService.update(
      updateTradeProductInput.id,
      updateTradeProductInput,
    );
  }

  @Mutation(() => TradeProduct)
  removeTradeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.tradeProductsService.remove(id);
  }

  @ResolveField(() => [Sale], { name: 'sales' })
  getSalesByTradeProduct(
    @Parent() tradeProduct: TradeProduct,
    @Args() paginationSalesArgs:PaginationSalesArgs,
    @CurrentUserGql() user: User,
  ):Promise<Sale[]> {
    return this.salesService.findAllByTradeProductId(paginationSalesArgs,tradeProduct.id);
  }
}
