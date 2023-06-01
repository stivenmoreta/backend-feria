import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ProductsModule } from '../products/products.module';


@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports:[TypeOrmModule.forFeature([Category]), ProductsModule],
  exports:[TypeOrmModule, CategoriesService]
})
export class CategoriesModule {}
