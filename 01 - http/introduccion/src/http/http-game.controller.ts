import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {PuppyCreateDto} from "./dto/puppy.create-dto";
import {validate, ValidationError} from "class-validator";

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
    async bodyParams(
        @Body() bodyParams
    ){
        const validPuppet = new PuppyCreateDto();
        validPuppet.name = bodyParams.name;
        validPuppet.age = bodyParams.age;
        validPuppet.married = bodyParams.married;
        validPuppet.ligature = bodyParams.ligature;
        validPuppet.weight = bodyParams.weight;

        try {
            const isErrors:ValidationError[] = await validate(validPuppet)
            if(isErrors.length > 0){
                console.error('Errors: ', isErrors);
                throw new BadRequestException('Validation error');
            }else{
                return {
                    msg: 'Created'
                };
            }

        }catch (e) {
            throw new BadRequestException('Validation error')
        }
    }

    @Get('saveInsecureCookie')
    saveInsecureCookie(
        @Query() queryParams,
        @Req() req, //request
        @Res() res //response
    ) {
        res.cookie(
            'insecureCookie', //cookieName
            'Hungry', //value
        );
        res.send({
            msg: 'ok'
        })
        //not allowed to use return when using @Res()

    }


    @Get('saveSafeCookie')
    saveSecureCookie(
        @Query() queryParams,
        @Req() req, //request
        @Res() res //response
    ) {
        res.cookie(
            'safeCookie', //cookieName
            'Web :3', //value
            {
                secure: true
            }
        );
        res.send({
            msg: 'safeCookie'
        })
        //not allowed to use return when using @Res()
    }

    @Get ( 'showCookies')
    showCookies(
        @Req() req
    ){
        return ({
            noSigned: req.cookies,
            signed: req.signedCookies
        });
    }

    @Get('saveSignedCookie')
    saveSignedCookie(
        @Res() res
    ){
        res.cookie('signed','mySecret',{signed: true});
        res.send({
            msg: 'ok'
        });
    }


}