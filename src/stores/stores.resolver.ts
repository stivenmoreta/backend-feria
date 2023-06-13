import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
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


import { User } from '../users/entities/user.entity';
import { Store } from './entities/store.entity';
import { Category } from '../categories/entities/category.entity';
import { StoresService } from './stores.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateStoreInput, UpdateStoreInput } from './dto';
import { PaginationWithSearch } from '../common/dto/pagination-search.args';

import { JwtAuthGqlGuard } from '../auth/guards';
import { CurrentUserGql } from '../auth/decorators';
import { ValidRoles as VR } from '../auth/guards/interfaces';

@Resolver(() => Store)
@UseGuards(JwtAuthGqlGuard)
export class StoresResolver {
  constructor(
    private readonly storesService: StoresService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Mutation(() => Store, { name: 'createStore' })
  createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Store> {
    return this.storesService.create(createStoreInput, user);
  }

  @Query(() => [Store], { name: 'stores' })
  findAll(
    @Args() paginationArgs: PaginationWithSearch,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Store[]> {
    return this.storesService.findAll(paginationArgs, user);
  }

  @Mutation(() => Store, { name: 'updateStore' })
  updateStore(
    @Args('updateStoreInput') updateStoreInput: UpdateStoreInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Store> {
    return this.storesService.update(updateStoreInput.id, updateStoreInput);
  }

  @Mutation(() => Store, { name: 'removeStore' })
  removeStore(
    @Args('id', { type: () => ID },ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Store> {
    return this.storesService.remove(id);
  }

  @ResolveField(() => Int, { name: 'storeCount' })
  StoreCount(@CurrentUserGql([VR.admin]) user: User): Promise<number> {
    return this.storesService.storeCount();
  }

  @ResolveField(() => [Category], { name: 'categories' })
  getCategoriesByStore(
    @CurrentUserGql([VR.user]) user: User,
    @Parent() store: Store,
    @Args() paginationArgs: PaginationWithSearch,
  ): Promise<Category[]> {
    return this.categoriesService.findAll(paginationArgs, store);
  }
}
