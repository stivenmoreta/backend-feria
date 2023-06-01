import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TradeProduct } from 'src/trade-products/entities/trade-product.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethods } from '../enum/payment-method.enum';

@ObjectType()
@Entity ({ name: 'sales' })
export class Sale {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column({ type: 'text' })
  name: string;

  @Field(() => PaymentMethods)
  @Column({ type: 'text' })
  paymentMethod: PaymentMethods;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => TradeProduct , (tradeProduct) => tradeProduct.sales)
  tradeProduct: TradeProduct;

}
