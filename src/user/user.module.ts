import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver],
  imports:[
    TypeOrmModule.forFeature([ User ]),
  ],
  exports:[TypeOrmModule]
})
export class UserModule {}
