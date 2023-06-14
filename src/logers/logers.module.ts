import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogersService } from './logers.service';
import { LogerSchema } from './entities/loger.entity';
import { LoggingPlugin } from './plugins/loger.plugins';
import { LogersController } from './logers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Loger', schema: LogerSchema}]),AuthModule],
  providers: [LogersService,LoggingPlugin],
  exports:[LogersService],
  controllers: [LogersController]
})
export class LogersModule {}
