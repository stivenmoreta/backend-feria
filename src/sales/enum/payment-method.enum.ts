import { registerEnumType } from "@nestjs/graphql";

// TODO: Implementar enum como GraphQL Enum Type
export enum PaymentMethods {
    efectivo = 'efectivo', 
    transferencia = 'transferencia', 
}

registerEnumType(PaymentMethods, {name:'PaymentMethods',description:'métodos de pagos validos para registrar una venta'})