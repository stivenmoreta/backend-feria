import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { PaymentMethods } from '../enum/payment-method.enum';
import { IsEnum, IsUUID } from 'class-validator';

@InputType()
export class CreateSaleInput {
  @Field(() => PaymentMethods, { description: 'método de pago de la venta' })
  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;

  @Field(() => ID, { description: 'id del producto de la venta' })
  @IsUUID()
  tradeProductId: string;
}
