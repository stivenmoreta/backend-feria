import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  ID,
  Parent,
} from '@nestjs/graphql';

import { Product } from './entities/product.entity';
import { TradeProduct } from 'src/trade-products/entities/trade-product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from './products.service';
import { TradeProductsService } from '../trade-products/trade-products.service';
import { CreateProductInput, UpdateProductInput } from './dto';
import { PaginationWithSearch } from 'src/common/dto';

import { JwtAuthGqlGuard } from 'src/auth/guards';
import { CurrentUserGql } from 'src/auth/decorators';
import { ValidRoles as VR } from 'src/auth/guards/interfaces';

@Resolver(() => Product)
@UseGuards(JwtAuthGqlGuard)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly tradeProductsService: TradeProductsService,
  ) {}

  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @CurrentUserGql([VR.user]) user: User,
    @Args() PaginationWithSearch: PaginationWithSearch,
  ): Promise<Product[]>{
    return this.productsService.findAllByUser(PaginationWithSearch, user);
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Product>{
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product, { name: 'removeProduct' })
  removeProduct(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Product> {
    return this.productsService.remove(id);
  }

  @ResolveField(() => [TradeProduct], { name: 'tradeProducts' })
  getTradeProductsByProduct(
    @Args() paginationWithSearch: PaginationWithSearch,
    @Parent() product: Product,
    @CurrentUserGql() user: User,
  ): Promise<TradeProduct[]>{
    return this.tradeProductsService.findAllByProductId(
      paginationWithSearch,
      product.id,
    );
  }
}
