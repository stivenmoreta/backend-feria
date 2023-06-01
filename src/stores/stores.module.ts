import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresResolver } from './stores.resolver';
import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [StoresResolver, StoresService],
  imports: [TypeOrmModule.forFeature([Store]), CategoriesModule],
  exports: [TypeOrmModule],
})
export class StoresModule {}
