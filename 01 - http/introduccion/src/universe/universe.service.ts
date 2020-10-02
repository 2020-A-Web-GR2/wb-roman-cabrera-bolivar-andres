import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {UniverseEntity} from "./universe.entity";

@Injectable()
export class UniverseService{
    constructor(
        @InjectRepository(UniverseEntity)
        private repo : Repository<UniverseEntity>
    ) {
    }

    findByName(queryText? : string){
        const query : FindManyOptions<UniverseEntity> = {
            where: [
                {
                    name : Like(`%${queryText}%`)
                }
            ]
        }
        return this.repo.find(query)
    }
    findByLocation(queryText? : string){
        const query : FindManyOptions<UniverseEntity> = {
            where : [
                {
                    location : Like(`%${queryText}%`)
                }
            ]
        }
        return this.repo.find(query)
    }
    createOne(universe : UniverseEntity){
        return this.repo.save(universe)
    }
    getAll(){
        return this.repo.find()
    }
    getOne(id : number){
        return this.repo.findOne(id)
    }
    updateOne(universeEdited : UniverseEntity){
        return this.repo.save(universeEdited)
    }
    deleteOne(id : number){
        return this.repo.delete(id)
    }
}