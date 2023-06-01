import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'name category' })
  @IsString()
  name: string;

  @Field(() => ID, { description: 'id store' })
  @IsUUID()
  storeId: string;
}
