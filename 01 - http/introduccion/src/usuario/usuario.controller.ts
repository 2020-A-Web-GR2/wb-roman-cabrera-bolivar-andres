import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

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

    @Get()
    showAll(){
        return this.arrayUsers
    }

    @Post()
    addOne(
        @Body() bodyParams
    ){

        const newUSer = {
            id: this.currentid +1,
            name: bodyParams.name
        };
        this.arrayUsers.push(newUSer)
        this.currentid += this.currentid + 1;
        return newUSer;
    }

    @Get(':id')
    getOne(
        @Param() pathParams
    ){
        const index = this.arrayUsers.findIndex(
            // (user) => user.id === Number(pathParams.id)
            (user) => user.id === Number(pathParams.id)
        )
        return this.arrayUsers[index]
    }

    @Put(':id')
    updateOne(
        @Param() pathParams,
        @Body() bodyParams
    ){
        const index = this.arrayUsers.findIndex(
            // (user) => user.id === Number(pathParams.id)
            (user) => user.id === Number(pathParams.id)
        )
        this.arrayUsers[index] = bodyParams.name;
        return this.arrayUsers[index];
    }
    @Delete(':id')
    deleteOne(
        @Param() pathParams
    ){
        const index = this.arrayUsers.findIndex(
            // (user) => user.id === Number(pathParams.id)
            (user) => user.id === Number(pathParams.id)
        )
        this.arrayUsers.splice(index,1);
        return this.arrayUsers[index];
    }
}