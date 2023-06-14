import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { Loger } from './entities/loger.entity';
import { LogersService } from './logers.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/guards/interfaces';

//TODO: reestudiar el auth de nest api
@Controller('logers')
export class LogersController {
  constructor(private readonly logersService: LogersService) {}

  @Get()
  @Auth(ValidRoles.admin)
  async findAll(): Promise<Loger[]> {
    return this.logersService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  async findOne(@Param('id', ParseUUIDPipe ) id: string): Promise<Loger> {
    return this.logersService.findOne(id);
  }
}
