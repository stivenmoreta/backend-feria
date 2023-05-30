import { Stage } from "src/common/enum/stage.enum"

/**
 * * Una vez Joi valida el .env y setea las variables estas llegan aca.
 * ! todas la variables son string se pueden modifica por aca solo para el configService
 */
export const EnvConfiguration = () => {
    return{
        APP_VERSION: process.env.APP_VERSION ,
        STAGE: process.env.STAGE,
        PORT: process.env.PORT,
        HOST_API: process.env.HOST_API,
    
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
    
        JWT_SECRET: process.env.JWT_SECRET
    }

}





