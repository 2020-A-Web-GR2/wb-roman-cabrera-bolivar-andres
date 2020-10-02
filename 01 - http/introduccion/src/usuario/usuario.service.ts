import {Injectable}  from "@nestjs/common";
import {FindManyOptions, Like, Not, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {not} from "rxjs/internal-compatibility";

@Injectable()
export class UsuarioService {
    constructor( //Inject dependencies
        @InjectRepository(UsuarioEntity)
            private repo: Repository<UsuarioEntity>
    ) {
    }
    createOne(newUser : UsuarioEntity){
        return this.repo.save(newUser)
    }

    findAll(text? : string){
        const cons: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    name: Like(`%${text}%`)
                },
                {
                    last_name: Like(`%${text}%`)
                },
                {
                    dni: Like(`%${text}%`)
                }
            ]
        }
        return this.repo.find(cons)
    }

    findOne(id: number){
        return this.repo.findOne(id)
    }
    updateOne(editedUser : UsuarioEntity){
        return this.repo.save(editedUser)
    }
    deleteOne(id: number) {
        return this.repo.delete(id);
    }
}
