import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {Repository} from "typeorm";

@Injectable()
export class MascotaService{
    constructor(
        @InjectRepository(MascotaEntity)
        private repo: Repository<MascotaEntity>
    ) {
    }
    createNewMascota(mascota : MascotaEntity){
        return this.repo.save(mascota);
    }
}