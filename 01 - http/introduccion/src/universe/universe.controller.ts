import {Body, Controller, Get, InternalServerErrorException, Param, Post, Query, Res, Session} from "@nestjs/common";
import {UniverseService} from "./universe.service";
import {UniverseCreateDto} from "./dto/universe.create-dto";
import {validate, ValidationError} from "class-validator";
import {UniverseUpdateDto} from "./dto/universe.update-dto";
import {UniverseEntity} from "./universe.entity";

@Controller('universe')
export class UniverseController{
    constructor(
        private readonly _universeService : UniverseService
    ) {
    }


   @Get()
    async main(
        @Res() res,
        @Query() queryParams,
        @Session() session
    ){
        const loggedIn = session.username;
       if(loggedIn){
           let result;
           if(queryParams.searchName || queryParams.searchLocation){
               try{
                   if(queryParams.searchName){
                       result = await this._universeService.findByName(queryParams.searchName);
                   }else if (queryParams.searchLocation){
                       result = await this._universeService.findByLocation(queryParams.searchLocation);
                   }
               }catch (e) {
                   console.log(e)
                   throw new InternalServerErrorException('Error finding universe')
               }
           }else{
               try{
                   result = await this._universeService.getAll()
               }catch (e) {
                   throw new InternalServerErrorException('Error finding universe')
               }
           }
           return res.render('universe/main', {universes: result, msg: queryParams.msg, error: queryParams.error})
       }
       return res.redirect('/login')
    }

    @Get('create')
    createView(
        @Res() res,
        @Query() queryParams,
        @Session() session
    ){
        const loggedIn = session.username;
        if(loggedIn){
            return res.render('universe/create', {
                error : queryParams.error,
                name : queryParams.name,
                location : queryParams.location,
                width : queryParams.width,
                height : queryParams.height,
                date : queryParams.date
            });
        }
        return res.redirect('/login')
    }

    @Post('create')
    async create(
        @Body() bodyParams,
        @Res() res,
        @Session() session
    ){
        const loggedIn = session.username;
        if(loggedIn){
            const validatedObject = new UniverseCreateDto();
            validatedObject.name = bodyParams.name;
            validatedObject.location = bodyParams.location;
            validatedObject.width = bodyParams.width;
            validatedObject.height = bodyParams.height;
            validatedObject.dateBorn = bodyParams.dateBorn;
            const errors : ValidationError[] = await validate(validatedObject);
            if (errors.length > 0){
                console.error('Errors: ', errors);
                let data = `&name=${bodyParams.name}&location=${bodyParams.location}&width=${bodyParams.width}&height=${bodyParams.height}&dateBorn=${bodyParams.dateBorn}`;
                return res.redirect('/universe/create?error=Invalid data'+data);
            }else{
                let response;
                try{
                    response = await this._universeService.createOne(bodyParams)
                }catch (e) {
                    console.error(e);
                    return res.redirect('/universe/create?error=Error creating universe')
                }
                if (response){
                    return res.redirect('/universe?msg=Created successfully')
                }else{
                    return res.redirect('/universe/create?error=Error creating universe')
                }
            }
        }else{
            return res.redirect('/login')
        }

    }


    @Get('edit/:id')
    async edit(
        @Query() queryParams,
        @Param() pathParams,
        @Res() res,
        @Session() session
    ){
        const loggedIn = session.username;
        if(loggedIn){
            const id = Number(pathParams.id)
            let found;
            try{
                found = await this._universeService.getOne(id)
            }catch (e) {
                console.error(e)
                return res.redirect('/universe?error=Error searching universe')
            }
            if(found){
                return res.render('universe/create', {
                    error : queryParams.error,
                    universe : found
                });
            }else{
                return res.redirect('/universe?error=Not found');
            }
        }
        return res.redirect('/login')
    }

    @Post('edit/:id')
    async editView(
        @Param() pathParams,
        @Body() bodyParams,
        @Res() res,
        @Session() session
    ) {
        const loggedIn = session.username;
        if (loggedIn) {
            const validatedUniverse = new UniverseUpdateDto();
            validatedUniverse.location = bodyParams.location;
            validatedUniverse.width = bodyParams.width;
            validatedUniverse.height = bodyParams.height;
            validatedUniverse.dateBorn = bodyParams.dateBorn;
            const errors : ValidationError[] = await validate(validatedUniverse);
            const editedObject = {
                id : Number(pathParams.id),
                location : bodyParams.location,
                width : bodyParams.width,
                height : bodyParams.height,
                dateBorn : bodyParams.dateBorn
            } as UniverseEntity;
            if(errors.length > 0){
                console.error('Errors: ', errors);
                let data = `&name=${editedObject.name}&location=${editedObject.location}&width=${editedObject.width}&height=${editedObject.height}&dateBorn=${editedObject.dateBorn}`;
                return res.redirect('/universe/edit/'+pathParams.id+'?error=Invalid data'+data)
            }else{
                try{
                    await this._universeService.updateOne(editedObject)
                    return res.redirect('/universe?msg=Edited successfully')
                }catch (e) {
                    console.error(e)
                    return res.redirect('/universe?msg=Error while editing')
                }
            }
        }
        return res.redirect('/login')
    }

    @Post('delete/:id')
    async delete(
        @Param() pathParams,
        @Res() res,
        @Session() session
    ){
        const loggedIn = session.username;
        if(loggedIn){
            try{
                await this._universeService.deleteOne(Number(pathParams.id));
                return res.redirect('/universe?msg=Deleted successfully')
            }catch (e) {
                console.error(e)
                return res.redirect('/universe?msg=Error while deleting')
            }
        }
        return res.redirect('/login')
    }


}