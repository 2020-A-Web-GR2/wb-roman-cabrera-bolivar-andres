import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([
    'name',
    'last_name',
    'dni',
    'dateBorn'
])

@Entity('epn_user') //table name
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned : true,
        comment : 'identification',
        name : 'id'

    })
    id: number;

    @Column({
        name : 'name',
        type : 'varchar',
        nullable : true,
        length : '60'
    })
    name? : string;

    @Column({
        name : 'last_name',
        type : 'varchar',
        nullable : true,
        length : '60'
    })
    last_name? : string;

    @Column({
        name : 'dni',
        type : 'varchar',
        nullable : false,
        unique : true,
        length : '18'
    })
    dni : string;

    @Column({
        name : 'wage',
        nullable : true,
        type : 'decimal',
        precision : 10, //100000000.
        scale : 4, //.0001
    })
    wage? : number;

    @Column({
        name : 'date_born',
        type : 'date',
        nullable : true
    })
    dateBorn? : string;

    @Column({
        name : 'datetime_born',
        type : 'datetime',
        nullable : true
    })
    dateTimeBorn? : string;

    @OneToMany(
        type => MascotaEntity,
        mascota => mascota.user
    )
    mascotas : MascotaEntity[]
}