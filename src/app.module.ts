import { join } from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi-schema.validation';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { TradeProductsModule } from './trade-products/trade-products.module';
import { SalesModule } from './sales/sales.module';
import { LogersModule } from './logers/logers.module';

import { LoggerMiddleware } from './logers/middlewares/loger.middleware';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      //con el paquete joi podemos validar el .env
      //TODO: investigar el paquete
      validationSchema: JoiValidationSchema,
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({ req }) {
          const token = req.headers.authorization?.replace('Bearer ', '');
          if (!token) throw Error('Token needed');

          const payload = jwtService.decode(token);
          if (!payload) throw Error('Token not valid');
        },
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    MongooseModule.forRoot(process.env.DB_MONGO_URL,{
      dbName: 'feriaDB',
    }),
    LogersModule,
    AuthModule,
    UsersModule,
    CommonModule,
    CategoriesModule,
    ProductsModule,
    StoresModule,
    TradeProductsModule,
    SalesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
