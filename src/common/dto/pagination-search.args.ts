import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { PaginationArgs } from "./pagination.args";


@ArgsType()
export class PaginationWithSearch extends PaginationArgs {

    @Field(()=>String, { nullable:true})
    @IsOptional()
    @IsString()
    search?: string;

}