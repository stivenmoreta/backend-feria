import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogersService } from './logers.service';
import { LogerSchema } from './entities/loger.entity';
import { LoggingPlugin } from './plugins/loger.plugins';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Loger', schema: LogerSchema}])],
  providers: [LogersService,LoggingPlugin],
  exports:[LogersService]
})
export class LogersModule {}
