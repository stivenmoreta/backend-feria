import { ApolloServerPlugin } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { LogersService } from '../logers.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  constructor(private readonly logersService: LogersService) {}

  async requestDidStart({ contextValue }) {
    const { baseUrl, body, method, rawHeaders } = contextValue.req;

    const { query, variables } = body;
    
    await this.logersService.create({
      rawHeaders,
      baseUrl,
      method,
      query,
      variables: JSON.stringify(variables),
    });
  }
}
