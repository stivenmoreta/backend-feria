import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Loger, LogerDocument } from './entities/loger.entity';
import { CreateLogerInput } from './dto/create-loger.input';

@Injectable()
export class LogersService {
  constructor(
    @InjectModel(Loger.name) private readonly logerModel: Model<LogerDocument>,
  ) {}

  async create(createLogerInput: CreateLogerInput): Promise<void> {
    const createdLoger = new this.logerModel(createLogerInput);

    await createdLoger.save();
  }

  async findAll(): Promise<Loger[]> {
    return await this.logerModel.find();
  }

  async findOne(logId: string): Promise<Loger> {
    return await this.logerModel.findOne({ logId });
  }
}
