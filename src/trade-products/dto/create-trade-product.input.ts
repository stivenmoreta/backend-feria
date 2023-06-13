import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsInt, IsUUID } from 'class-validator';

@InputType()
export class CreateTradeProductInput {
  @Field(() => Int)
  @IsInt()
  originalStock: number;

  @Field(() => Int)
  @IsInt()
  purchasePrice: number;

  @Field(() => Int)
  @IsInt()
  salePrice: number;

  @Field(() => ID)
  @IsUUID()
  productId: string;
}
