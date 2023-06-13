import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogersService } from '../logers.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logersService: LogersService) {}

  use(req: any, res: any, next: () => void) {
    const { method, baseUrl, body, rawHeaders } = req;

    this.logersService.create({
      baseUrl,
      method,
      rawHeaders,
      body: JSON.stringify(body),
    });

    next();
  }
}
