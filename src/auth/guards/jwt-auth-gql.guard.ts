import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGqlGuard extends AuthGuard('jwt') {

    //! Override
    getRequest( context: ExecutionContext ) {

        //primero llega aca ya que pasa por el userGuards
        const ctx = GqlExecutionContext.create( context );
        const request = ctx.getContext().req;

        return request;

    }

}