import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../../auth/guards/interfaces';
import { Store } from '../../stores/entities/store.entity';

@ObjectType()
@Entity('users')
export class User {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    @Field(() => String)
    email: string;

    @Column('text', {
        select: false
    })
    @Field(() => String)
    password: string;

    @Column('text')
    @Field(() => String)
    pnombre: string;

    @Column('text',{nullable:true})
    @Field(() => String)
    snombre: string;

    @Column('text')
    @Field(() => String)
    apellidop: string;

    @Column('text')
    @Field(() => String)
    apellidom: string;


    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: [ValidRoles.user]
    })
    roles: ValidRoles[];


    //relations

    @OneToMany(()=>Store,(store)=> store.user)
    stores:Store[]


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.pnombre = this.pnombre.toLowerCase().trim();
        this.snombre = this.snombre.toLowerCase().trim();
        this.apellidom = this.apellidom.toLowerCase().trim();
        this.apellidop = this.apellidop.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
