import { IsArray, IsString } from 'class-validator';
export class CreateLogerInput {
  @IsString()
  baseUrl: string;

  @IsString()
  method: string;

  @IsArray()
  rawHeaders:string[]

  @IsString()
  body?: string;

  @IsString()
  query?: string;

  @IsString()
  variables?: string;
}
