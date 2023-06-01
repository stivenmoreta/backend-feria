import { CreateTradeProductInput } from './create-trade-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTradeProductInput extends PartialType(CreateTradeProductInput) {
  @Field(() => Int)
  id: number;
}
