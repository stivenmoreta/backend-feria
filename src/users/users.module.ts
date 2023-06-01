import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports:[TypeOrmModule.forFeature([User])],
  exports:[TypeOrmModule]
})
export class UsersModule {}
