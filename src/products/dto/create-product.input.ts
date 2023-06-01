import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'name product' })
  @IsString()
  name: string;

  @Field(() => ID, { description: 'categoryId product' })
  @IsUUID()
  categoryId: string;
}
