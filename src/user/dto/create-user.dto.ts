import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    // @Field( () => String )
    // @IsNotEmpty()
    // id: string;
}
