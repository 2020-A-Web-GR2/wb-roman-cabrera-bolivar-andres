import {Injectable}  from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

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
    findAll(){
        return this.repo.find()
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
