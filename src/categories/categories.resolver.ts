import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  ID,
  Parent,
} from '@nestjs/graphql';


import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { CategoriesService } from './categories.service';
import { ProductsService } from '../products/products.service';

import { CreateCategoryInput, UpdateCategoryInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';

import { JwtAuthGqlGuard } from '../auth/guards';
import { CurrentUserGql } from '../auth/decorators';
import { ValidRoles as VR } from '../auth/guards/interfaces';

@Resolver(() => Category)
@UseGuards(JwtAuthGqlGuard)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Mutation(() => Category, { name: 'createCategory' })
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUserGql([VR.user]) user: User,
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
    @Args('id', { type: () => ID },ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.admin]) user: User,
  ): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
