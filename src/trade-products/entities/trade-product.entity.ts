import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Sale } from '../../sales/entities/sale.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'tradeproducts' })
export class TradeProduct {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  originalStock: number;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  stock: number;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  purchasePrice: number;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  salePrice: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.tradeProducts)
  product: Product;

  @OneToMany(() => Sale, (sale) => sale.tradeProduct)
  sales: Sale[];

  @BeforeInsert()
  insertInitialStock() {
      this.stock = this.originalStock;
  }
}
