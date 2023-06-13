import { ArgsType, Field } from "@nestjs/graphql";
import { PaymentMethods } from '../enum/payment-method.enum';
import { IsEnum,IsNotEmpty } from "class-validator";

@ArgsType()
export class PaymentMethodArgs {

    @Field(()=> PaymentMethods, { nullable:true})
    @IsNotEmpty()
    @IsEnum(PaymentMethods)
    paymentMethod?: PaymentMethods;

}