import { IsUUID } from 'class-validator';
import { CreateSaleInput } from './create-sale.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSaleInput extends PartialType(CreateSaleInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
