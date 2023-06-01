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
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { TradeProduct } from 'src/trade-products/entities/trade-product.entity';
import { CurrentUserGql } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ValidRoles as VR } from 'src/auth/guards/interfaces';
import { TradeProductsService } from '../trade-products/trade-products.service';
import { PaginationWithSearch } from 'src/common/dto';
import { JwtAuthGqlGuard } from 'src/auth/guards';

@Resolver(() => Product)
@UseGuards(JwtAuthGqlGuard)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly tradeProductsService: TradeProductsService,
  ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUserGql([VR.user]) user: User,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @CurrentUserGql([VR.user]) user: User,
    @Args() PaginationWithSearch: PaginationWithSearch
  ) {
    return this.productsService.findAllByUser(PaginationWithSearch, user);
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  @ResolveField(() => [TradeProduct], { name: 'tradeProducts' })
  getTradeProductsByProduct(
    @Args() paginationWithSearch: PaginationWithSearch,
    @Parent() product: Product,
    @CurrentUserGql() user: User,
  ) {
    return this.tradeProductsService.findAllByProductId(
      paginationWithSearch,
      product.id,
    );
  }
}
