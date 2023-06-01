import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "../../common/dto";
import { IsDate, IsEnum, IsOptional } from "class-validator";
import { PaymentMethods } from "../enum/payment-method.enum";


@ArgsType()
export class PaginationSalesArgs extends PaginationArgs {

    @Field(()=> Date, { nullable:true})
    @IsOptional()
    @IsDate()
    fecha?: Date;

    @Field(()=> PaymentMethods, { nullable:true})
    @IsOptional()
    @IsEnum(PaymentMethods)
    paymentMethod?: PaymentMethods;

}