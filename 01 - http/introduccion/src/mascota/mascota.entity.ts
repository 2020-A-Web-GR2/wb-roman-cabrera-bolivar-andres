import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(
        type => UsuarioEntity,
        user => user.mascotas
    )
    user : UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacuna : VacunaEntity[];
}