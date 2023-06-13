import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TradeProduct } from 'src/trade-products/entities/trade-product.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethods } from '../enum/payment-method.enum';

@ObjectType()
@Entity ({ name: 'sales' })
export class Sale {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => PaymentMethods)
  @Column({ type: 'text' })
  paymentMethod: PaymentMethods;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;


  @ManyToOne(() => TradeProduct , (tradeProduct) => tradeProduct.sales)
  tradeProduct: TradeProduct;

}
