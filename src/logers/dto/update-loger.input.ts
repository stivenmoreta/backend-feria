import { CreateLogerInput } from './create-loger.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLogerInput extends PartialType(CreateLogerInput) {
  @Field(() => Int)
  id: number;
}
