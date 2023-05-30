import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {
    
    //** Error for postgrest bd
    handleDBErrors( error: any ): never {

        if ( error.code === '23505' ) 
          throw new BadRequestException( error.detail );
    
        throw new InternalServerErrorException('Please check server logs');
    
    }
}
