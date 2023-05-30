import * as Joi from "joi";
import { Stage } from "src/common/enum/stage.enum";

/**
 * * Paso 1, valida que exista estas variables en el .env
 * * paso 2, de no existir se setean según sea el caso.
 * ! todas las variables creadas por Joi son string.
 */

export const JoiValidationSchema = Joi.object({
    APP_VERSION:Joi.string().default('0.0.1'),
    STAGE:Joi.string().valid(Stage.prod,Stage.dev).default(Stage.dev),
    PORT: Joi.number().default(3005),
    HOST_API:Joi.string().default('http://localhost:3005/api'),

    DB_NAME:Joi.string().required(),
    DB_HOST:Joi.string().required(),
    DB_PORT:Joi.number().required(),
    DB_USERNAME:Joi.string().required(),
    DB_PASSWORD:Joi.string().required(),
    
    JWT_SECRET:Joi.string().required(),
})