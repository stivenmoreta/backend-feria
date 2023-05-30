import { join } from 'path';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi-schema.validation';



@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      //con el paquete joi podemos validar el .env
      //TODO: investigar el paquete
      validationSchema: JoiValidationSchema
    }),


      GraphQLModule.forRootAsync({
        driver:ApolloDriver,
        imports:[AuthModule],
        inject:[JwtService],
        useFactory: async (jwtService:JwtService) => ({
            playground: false,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            plugins: [
              ApolloServerPluginLandingPageLocalDefault()
            ],
            context({req}){

              const token = req.headers.authorization?.replace('Bearer ','')      
              if(!token) throw Error('Token needed')

              const payload = jwtService.decode(token)
              if(!payload) throw Error('Token not valid')

            }
        })
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

    AuthModule,
    UserModule,
    CommonModule
    ],
})
export class AppModule {}
