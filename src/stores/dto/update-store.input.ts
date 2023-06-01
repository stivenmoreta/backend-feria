import { CreateStoreInput } from './create-store.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {

  @Field(() => ID, { description: 'store id' })
  id: string;

}
