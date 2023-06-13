import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { TradeProduct } from 'src/trade-products/entities/trade-product.entity';

@Module({
  providers: [SalesResolver, SalesService],
  imports:[TypeOrmModule.forFeature([Sale,TradeProduct])],
  exports:[TypeOrmModule, SalesService]
})
export class SalesModule {}
