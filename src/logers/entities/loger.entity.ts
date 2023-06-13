import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogerDocument = HydratedDocument<Document>;

@Schema()
export class Loger {
  @Prop({ required: true })
  baseUrl: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  rawHeaders: string[];

  @Prop()
  body: string;

  @Prop()
  query: string;

  @Prop()
  variables: string;
}

export const LogerSchema = SchemaFactory.createForClass(Loger);
