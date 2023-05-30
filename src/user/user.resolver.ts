import { Resolver, Query, Int } from '@nestjs/graphql';

@Resolver(() => Int)
export class UserResolver {

  @Query(() => Int)
  findAll(): number {
    return 2;
  }


  @Query(() => Int)
  findAlltwo(): number {
    return 2;
  }

}
