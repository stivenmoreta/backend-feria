import { ValidRoles } from 'src/auth/guards/interfaces';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    pnombre: string;

    @Column('text',{nullable:true})
    snombre: string;

    @Column('text')
    apellidop: string;

    @Column('text')
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
