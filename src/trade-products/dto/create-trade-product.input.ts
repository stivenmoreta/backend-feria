import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTradeProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
