import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateStoreInput {

  @Field(() => String, { description: 'name store' })
  @IsString()
  name: string;

}
