import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Index([
    'name',
],
    {
        unique : true
    })

@Entity('universe') //table name
export class UniverseEntity{
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
        name : 'location',
        type : 'varchar',
        nullable : true,
        length : '60'
    })
    location? : string;

    @Column({
        name : 'width',
        nullable : true
    })
    width? : number;

    @Column({
        name : 'height',
        nullable : true
    })
    height? : number;

    @Column({
        name : 'date_born',
        type : 'date',
        nullable : true
    })
    dateBorn? : string;
}