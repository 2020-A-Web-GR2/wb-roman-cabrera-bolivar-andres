import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from "@nestjs/common";

@Controller('games-http')
export class HttpGameController{
    @Get('hello')
    @HttpCode(201)
    helloGET(){
        //throw new BadRequestException('Nothing sent')
        return 'Hello GET! :)';
    }

    @Post('hello')
    @HttpCode(202)
    helloPOST(){
        return 'Hello POST :)';
    }

    @Delete('hello')
    @HttpCode(204)
    @Header('cache-control','none')
    @Header('EPN','Simple testing')
    helloDETETE(){
        return 'Hello DELETE :)';
    }

    @Get('/path-params/:age/management/:height')
    pathParamsExample(
        @Param() pathParams
    ){
        console.log('Parameters', pathParams)
        if (isNaN(pathParams.age) || isNaN(pathParams.height)) {
            throw new BadRequestException('Not a number')
        }else{
            const age = Number(pathParams.age);
            const height = Number(pathParams.height);
            return age + height;
        }

    }

    @Get('query-params')
    queryParams(
        @Query() queryParams
    ){
        console.log('query-params', queryParams);
        return queryParams.nombre + ' ' + queryParams.apellido +  ':)';
    }

    @Post('body-params')
    bodyParams(
        @Body() bodyParams
    ){
        console.log('body-params', bodyParams);
        return 'record created';
    }


}