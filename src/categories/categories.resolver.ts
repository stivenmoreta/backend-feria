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

import { JwtAuthGqlGuard } from 'src/auth/guards';
import { CurrentUserGql } from 'src/auth/decorators';
import { ValidRoles as VR } from 'src/auth/guards/interfaces';

import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { CategoriesService } from './categories.service';
import { ProductsService } from '../products/products.service';

import { CreateCategoryInput, UpdateCategoryInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';

@Resolver(() => Category)
@UseGuards(JwtAuthGqlGuard)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Mutation(() => Category, { name: 'createCategory' })
  createCategory(
    @CurrentUserGql([VR.user]) user: User,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryInput);
  }

  @ResolveField(() => [Product], { name: 'products' })
  getProductsByCategory(
    @Args() paginationArgs: PaginationWithSearch,
    @Parent() category: Category,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Product[]> {
    return this.productsService.findAllByCategory(paginationArgs, category);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  updateCategory(
    @CurrentUserGql([VR.admin]) user: User,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category, { name: 'removeCategory' })
  removeCategory(
    @CurrentUserGql([VR.admin]) user: User,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
