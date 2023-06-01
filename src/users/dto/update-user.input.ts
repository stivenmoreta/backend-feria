import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;
}
