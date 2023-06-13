import { IsUUID } from 'class-validator';
import { CreateStoreInput } from './create-store.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {

  @Field(() => ID, { description: 'store id' })
  @IsUUID()
  id: string;

}
