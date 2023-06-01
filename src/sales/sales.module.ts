import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';

@Module({
  providers: [SalesResolver, SalesService],
  imports:[TypeOrmModule.forFeature([Sale])],
  exports:[TypeOrmModule, SalesService]
})
export class SalesModule {}
