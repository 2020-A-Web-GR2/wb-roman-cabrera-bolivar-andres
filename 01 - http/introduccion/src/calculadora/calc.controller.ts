import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode, HttpException, HttpStatus,
    Param,
    Post, Put,
    Query,
    Req, Res
} from "@nestjs/common";
@Controller('calc')
export  class CalcController{

    @Get('saveUser')
    @HttpCode(201)
    saveUSer(
        @Query() query,
        @Req() req,
        @Res() res
    ){
        if(query.username === undefined || query.username == ''){
            throw new BadRequestException('Username required in path');
        }else{
            res.cookie('user',query.username);
            res.cookie('score',100,{signed : true});
            res.send({
                msg : 'ok'
            })
        }
    }

    userSaved(
        @Req() req
    ): boolean {
        const userCookie : object = req.cookies;
        return !!(userCookie['user']);
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


    @Get('add')
    @HttpCode(200)
    sum(
        @Query() query,
        @Req() req,
        @Res() res
    ){
       if(this.userSaved(req)){
           console.log(query)
           if (!Number.isNaN(Number.parseFloat(query.n1)) &&  !Number.isNaN(Number.parseFloat(query.n2))){
               console.log(typeof(req.signedCookies['score']));
               const sum = Number.parseFloat(query.n1) + Number.parseFloat(query.n2);
               const newScore = Number.parseFloat(req.signedCookies['score']) - sum;
               if(newScore <= 0){
                   throw new HttpException({
                       status: HttpStatus.FORBIDDEN,
                       error: 'No points available, use saveUser to renew points'
                   }, HttpStatus.FORBIDDEN);
               }else{
                   res.cookie('score',newScore,{signed : true});
                   res.send({
                       op: 'sum',
                       result: sum,
                       score: newScore
                   });
               }
           }else{
               throw new BadRequestException('Incorrect parameters');
           }
       }else{
           throw new BadRequestException('User not registered');
       }
    }


    @Put('subs')
    @HttpCode(201)
    subs(
        @Body() body,
        @Req() req,
        @Res() res
    ){
        if(this.userSaved(req)){
            if (!Number.isNaN(Number.parseFloat(body.n1)) &&  !Number.isNaN(Number.parseFloat(body.n2))){
                const subs = Number.parseFloat(body.n1) - Number.parseFloat(body.n2);
                const newScore = Number.parseFloat(req.signedCookies['score']) - subs;
                if(newScore <= 0){
                    throw new HttpException({
                        status: HttpStatus.FORBIDDEN,
                        error: 'No points available, use saveUser to renew points'
                    }, HttpStatus.FORBIDDEN);
                }else{
                    res.cookie('score',newScore,{signed : true});
                    res.send({
                        op: 'subs',
                        result: subs,
                        score: newScore
                    });
                }
            }else{
                throw new BadRequestException('Incorrect parameters');
            }
        }else{
            throw new BadRequestException('User not registered');
        }
    }


    @Delete('multi')
    @HttpCode(200)
    multi(
        @Headers() header,
        @Req() req,
        @Res() res
    ){
        if(this.userSaved(req)){
            if (!Number.isNaN(Number.parseFloat(header.n1)) &&  !Number.isNaN(Number.parseFloat(header.n2))){
                const multi = Number.parseFloat(header.n1) * Number.parseFloat(header.n2);
                const newScore = Number.parseFloat(req.signedCookies['score']) - multi;
                if(newScore <= 0){
                    throw new HttpException({
                        status: HttpStatus.FORBIDDEN,
                        error: 'No points available, use saveUser to renew points'
                    }, HttpStatus.FORBIDDEN);
                }else{
                    res.cookie('score',newScore,{signed : true});
                    res.send({
                        op: 'multi',
                        result: multi,
                        score: newScore
                    });
                }
            }else{
                throw new BadRequestException('Incorrect parameters');
            }
        }else{
            throw new BadRequestException('User not registered');
        }
    }


    @Post('div/n1/:n1/n2/:n2')
    @HttpCode(201)
    div(
        @Param() pathParams,
        @Req() req,
        @Res() res
    ){
        if(this.userSaved(req)){
            if (!Number.isNaN(Number.parseFloat(pathParams.n1)) &&  !Number.isNaN(Number.parseFloat(pathParams.n2))){
                if(Number.parseFloat(pathParams.n2) > 0){
                    const div = Number.parseFloat(pathParams.n1) / Number.parseFloat(pathParams.n2);
                    const newScore = Number.parseFloat(req.signedCookies['score']) - div;
                    if(newScore <= 0){
                        throw new HttpException({
                            status: HttpStatus.FORBIDDEN,
                            error: 'No points available, use saveUser to renew points'
                        }, HttpStatus.FORBIDDEN);
                    }else{
                        res.cookie('score',newScore,{signed : true});
                        res.send({
                            op: 'div',
                            result: div,
                            score: newScore
                        });
                    }
                }else{
                    throw new HttpException({
                        status: HttpStatus.NOT_ACCEPTABLE,
                        error: 'Dividend must be greater than 0'
                    },HttpStatus.NOT_ACCEPTABLE);
                }
            }else{
                throw new BadRequestException('Incorrect parameters');
            }
        }else{
            throw new BadRequestException('User not registered');
        }
    }
}