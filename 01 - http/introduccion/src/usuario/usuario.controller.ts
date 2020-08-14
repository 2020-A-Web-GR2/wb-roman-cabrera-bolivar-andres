import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {

    arrayUsers  = [
        {
            id: 1,
            name: 'Bolivar'
        },
        {
            id: 2,
            name: 'Andres'
        },
        {
            id : 3,
            name: 'Pamela'
        }
    ]
    currentid = 3

    constructor( //inyeccion
        private readonly _usuarioService : UsuarioService
    ) {
    }

    @Get()
    async showAll(){
        try{
            const res = await this._usuarioService.findAll();
            return res
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                msg: 'Server error'
            })
        }
    }

    @Post()
    async addOne(
        @Body() bodyParams
    ){


        try{
            const res = await this._usuarioService.createOne(bodyParams)
            return res;
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                msg: 'Validating error'
            });
        }

        const newUSer = {
            id: this.currentid +1,
            name: bodyParams.name
        };
        this.arrayUsers.push(newUSer)
        this.currentid += this.currentid + 1;
        return newUSer;
    }

    @Get(':id')
    async getOne(
        @Param() pathParams
    ){
        /*const index = this.arrayUsers.findIndex(
            // (user) => user.id === Number(pathParams.id)
            (user) => user.id === Number(pathParams.id)
        )
        return this.arrayUsers[index]*/
        let res;
        try{
            res = await this._usuarioService.findOne(Number(pathParams.id));
            return res;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                msg: 'Server error',
            })
        }
        if(res){
            return res;
        } else{
            throw new NotFoundException({
                msg: 'Registers not found'
            })
        }
    }

    @Put(':id')
    async updateOne(
        @Param() pathParams,
        @Body() bodyParams
    ){
        const id = Number(pathParams.id);
        const updatedUser = bodyParams;
        updatedUser.id = id;
        try {
            const res = await this._usuarioService.updateOne(updatedUser)
            return res;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                msg: 'Server error'
            })
        }

        /*const index = this.arrayUsers.findIndex(
            // (user) => user.id === Number(pathParams.id)
            (user) => user.id === Number(pathParams.id)
        )
        this.arrayUsers[index] = bodyParams.name;
        return this.arrayUsers[index];*/
    }


    @Delete(':id')
    async deleteOne(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try{
            const res = await this._usuarioService.deleteOne(id);
            return {
                msg: 'Record with id:' + id + 'deleted'
            };
        }
        catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                msg: 'Server error'
            })
        }
    }
}