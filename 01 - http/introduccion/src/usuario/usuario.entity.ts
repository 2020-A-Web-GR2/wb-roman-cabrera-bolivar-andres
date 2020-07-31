import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Index([
    'id',
    'columOne',
    'columTwo',
    'dni',
    'wage',
    'dateBorn',
    'dateTimeBorn' //properties name in class
])

@Index(['name','lastname','id_ced'],{unique : true})

@Entity('epn_user') //table name
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned : true,
        comment : 'id',
        name : 'id'

    })
    id: number;

    @Column({
        name : 'name',
        type : 'varchar',
        nullable : true,
        length : '60'
    })
    columnOne? : string;

    @Column({
        name : 'last_name',
        type : 'varchar',
        nullable : true,
        length : '60'
    })
    columnTwo? : string;

    @Column({
        name : 'id_ced',
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
}