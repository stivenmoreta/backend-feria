import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateLogerInput } from './dto/create-loger.input';
import { UpdateLogerInput } from './dto/update-loger.input';
import { Loger, LogerDocument } from './entities/loger.entity';

@Injectable()
export class LogersService {
  constructor(
    @InjectModel(Loger.name) private readonly logerModel: Model<LogerDocument>,
  ) {}

  async create(createLogerInput: CreateLogerInput): Promise<void>{

    const createdLoger = new this.logerModel(createLogerInput);

    await createdLoger.save();

  }

  findAll() {
    return `This action returns all logers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loger`;
  }

  update(id: number, updateLogerInput: UpdateLogerInput) {
    return `This action updates a #${id} loger`;
  }

  remove(id: number) {
    return `This action removes a #${id} loger`;
  }
}
