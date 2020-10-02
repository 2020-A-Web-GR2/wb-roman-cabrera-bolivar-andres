import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import {UsuarioEntity} from "./usuario.entity";

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

    constructor( //Inject dependencies
        private readonly _usuarioService : UsuarioService,
        private readonly _mascotaService : MascotaService
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


    @Post('userMascota')
    async createUserAndMascota(
        @Body() bodyParams
    ){
        const user = bodyParams.user;
        const mascota = bodyParams.mascota;
        //validate user and puppet, create both
        let createdUser;
        try {
            createdUser = await  this._usuarioService.createOne(user);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                msg : 'Error creating user',
            })
        }
        if (createdUser) {
            mascota.user = createdUser.id;
            let createdMascota;
            try {
                createdMascota = await this._mascotaService.createNewMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    msg : 'Error creating mascota'
                })
            }
            if (createdMascota) {
                return {
                    mascota : createdMascota,
                    user : createdUser
                }
            } else {
                throw new InternalServerErrorException({
                    msg: 'Error creating mascota'
                })
        }
    }  else {
            throw new InternalServerErrorException({
                msg: 'Error creating mascota'
            })
        }
    }


    @Get('view/user')
    viewUser(
        @Res() res
    ){
        const nameController = 'Bolivar'
        res.render(
            'user/example', //view name, file
            { //view parameters
                name : nameController,
            })
    }

    @Get('view/faq')
    faq(
        @Res() res
    ) {
        res.render('user/faq')
    }

    @Get('view/inicio')
    async inicio(
        @Query() queryParams,
        @Res() res
    ) {
        let result;
        try {
            result = await this._usuarioService.findAll(queryParams.search)
        } catch (e) {
            throw new InternalServerErrorException("Error looking for users")
        }
        if(result){
            res.render('user/inicio',{
                users : result
            })
        }else{
            throw new NotFoundException("No users found")
        }
    }



    @Get('view/create')
    createUserView(
        @Query() queryParams,
        @Res() res
    ) {
        res.render(
            'user/create',
            {
                error: queryParams.error,
                name: queryParams.name,
                last_name : queryParams.last_name,
                dni : queryParams.dni
            }
        )
    }

    @Get('view/edit/:id')
    async editUsuarioView(
        @Query() queryParams,
        @Param() pathParams,
        @Res() res
    ){
        const id = Number(pathParams.id)
        let userFound;
        try {
            userFound = await this._usuarioService.findOne(id)
        }catch (error){
            console.error('Server Error')
            return res.redirect('/usuario/view/inicio?error=Error buscando usuario')
        }
        if(userFound){
            return res.render(
                'user/create',
                {
                    error : queryParams.error,
                    user : userFound
                }
            )
        } else {
            return res.redirect('/usuario/view/inicio?error= User not found')
        }
    }

    @Post('createFromView')
    async createFromView(
        @Body() body,
        @Res() res
    ){
        let dataNames
        let dataDNI
        if(body.dni && body.name && body.last_name){
            dataNames = `&name=${body.name}&last_name=${body.last_name}`
            if(body.dni.length === 10){
                dataDNI = `&dni=${body.dni}`
            }else{
                const error = 'Incorrect DNI (10)'
                return res.redirect('/usuario/view/create?error=' + error + dataNames)
            }
        }else{
            const error = 'Send params DNI(10), name and last_name'
            return res.redirect('/usuario/view/create?error=' + error)
        }
        let responseCreateUser;
        try {
            responseCreateUser = await this._usuarioService.createOne(body)
        }catch (e) {
            console.error(e)
            const error = "Error creating user"
            return res.redirect('/usuario/view/create?error=' + error + dataNames + dataDNI)

        }
        if(responseCreateUser){
            res.redirect('/usuario/view/inicio')
        }else{
            const error = "Error creating user"
            return res.redirect('/usuario/view/create?error=' + error + dataNames + dataDNI)
        }
    }

    @Post('editFromView/:id')
    async editFromView(
        @Param() pathParams,
        @Body() bodyParams,
        @Res() res
    ){
        const editedUser = {
            id : Number(pathParams.id),
            name : pathParams.name,
            last_name : pathParams.last_name,
            //dni : pathParams.dni
        } as UsuarioEntity;

        try{
            await this._usuarioService.updateOne(editedUser)
            return res.redirect('/usuario/view/inicio?msg=User edited')
        }catch (e) {
            console.error(e)
            return res.redirect('/usuario/view/inicio?msg=Error editanto usuario')
        }
    }

    @Post('deleteFromView/:id')
    async deleteFromView(
        @Param() pathParam,
        @Res() res
    ){
        try {
            const id = Number(pathParam.id)
            await this._usuarioService.deleteOne(id)
            return res.redirect('/usuario/view/inicio')
        }catch (e) {
            console.log(e)
            return res.redirect('/usuario/view/inicio?error=Error eliminando usuario')
        }
    }

    @Get('view/login')
    login(
        @Res() res
    ) {
        res.render('user/login')
    }


}