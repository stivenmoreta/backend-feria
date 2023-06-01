import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TradeProductsModule } from 'src/trade-products/trade-products.module';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports:[TypeOrmModule.forFeature([Product]), TradeProductsModule],
  exports:[TypeOrmModule, ProductsService]
})
export class ProductsModule {}
