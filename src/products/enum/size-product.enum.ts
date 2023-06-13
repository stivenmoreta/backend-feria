import { registerEnumType } from "@nestjs/graphql";

// TODO: Implementar enum como GraphQL Enum Type
export enum SizeProducts {
    chico = 'chico', 
    mediano = 'mediano', 
    grande = 'grande',
}

registerEnumType(SizeProducts, {name:'SizeProducts',description:'Tamaño de los productos'})