import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Store } from '../../stores/entities/store.entity';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'text' })
  name: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Store, (store) => store.categories)
  store: Store;

  @OneToMany(() => Product, (product) => product.category, {lazy:true})
  products: Product[];
}
