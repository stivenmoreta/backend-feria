import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeProductsResolver } from './trade-products.resolver';
import { TradeProductsService } from './trade-products.service';
import { TradeProduct } from './entities/trade-product.entity';
import { SalesModule } from 'src/sales/sales.module';

@Module({
  providers: [TradeProductsResolver, TradeProductsService],
  imports:[TypeOrmModule.forFeature([TradeProduct],),SalesModule],
  exports:[TypeOrmModule, TradeProductsService]
})
export class TradeProductsModule {}
