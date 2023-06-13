import { IsUUID } from 'class-validator';
import { CreateTradeProductInput } from './create-trade-product.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTradeProductInput extends PartialType(CreateTradeProductInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
