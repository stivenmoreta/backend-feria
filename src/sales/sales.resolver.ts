import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';

import { Sale } from './entities/sale.entity';
import { User } from 'src/users/entities/user.entity';
import { SalesService } from './sales.service';
import { CreateSaleInput, UpdateSaleInput } from './dto';

import { JwtAuthGqlGuard } from 'src/auth/guards';
import { CurrentUserGql } from 'src/auth/decorators';
import { ValidRoles as VR } from 'src/auth/guards/interfaces';

@Resolver(() => Sale)
@UseGuards(JwtAuthGqlGuard)
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation(() => Sale, { name: 'createSale' })
  createSale(
    @Args('createSaleInput') createSaleInput: CreateSaleInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Sale> {
    return this.salesService.create(createSaleInput);
  }

  @Mutation(() => Sale, { name: 'updateSale' })
  updateSale(
    @Args('updateSaleInput') updateSaleInput: UpdateSaleInput,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Sale> {
    return this.salesService.update(updateSaleInput.id, updateSaleInput);
  }

  @Mutation(() => Sale, { name: 'removeSale' })
  removeSale(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql([VR.user]) user: User,
  ): Promise<Sale>{
    return this.salesService.remove(id);
  }
}
