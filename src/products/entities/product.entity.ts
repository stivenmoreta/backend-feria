import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { TradeProduct } from '../../trade-products/entities/trade-product.entity';
import { SizeProducts } from '../enum/size-product.enum';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'text' })
  name: string;

  @Field(() => SizeProducts)
  @Column({ type: 'text' , nullable:true})
  size: SizeProducts;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => TradeProduct, (tradeProduct) => tradeProduct.product)
  tradeProducts: TradeProduct[];

}
