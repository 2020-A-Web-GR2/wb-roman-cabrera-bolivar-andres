import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {query} from "express";
import {log} from "util";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*@Get('login')
  login(
      @Res() res,
      @Session() session,
      @Query() queryParams
  ){
    const loggedIn = session.user;
    if(loggedIn){
      return res.redirect('universe')
    }else{
      return res.render('universe/login',  {error: queryParams.error})
    }
  }

  @Post('login')
  loginPost(
    @Res() res,
    @Session() session,
    @Body() bodyParams
  ){
    const user = bodyParams.username;
    const passwd = bodyParams.password;
    if(user == 'Adrian' && passwd == '1234'){
      session.username = user;
      return res.redirect('/universe')
    }else{
      return res.redirect('/login?error=Invalid Credentials');
    }
  }

  @Get('logout')
  logout(
    @Res() res,
    @Req() req,
    @Session() session
  ){
    session.user = undefined;
    req.session.destroy();
    return res.redirect('/login')
  }*/




  @Post('login')
  loginPost(
    @Res() res,
    @Body() body,
    @Session() session
  ){
    const user = body.user;
    const passwd = body.password;
    if(user == 'bolivar' && passwd == '1234'){
      session.user = user
      session.roles = ['Admin']
      return res.redirect('protected')
    }else{
      if(user == 'pamela' && passwd == '1234'){
        session.user = user
        session.roles = ['Supervisor']
        return res.redirect('protected')
      }else{
        return res.redirect('/login')
      }
    }

  }

  @Get('protected')
  protected(
      @Res() res,
      @Session() session
  ){
    const loggedIn = session.user;
    if(loggedIn){
      return res.render(
          'login/protected',
          {
            user : session.user,
            roles : session.roles
          }
      )
    }else{
      return res.redirect('/login')
    }
  }

  @Get('logout')
  logout(
    @Res() res,
    @Req() req,
    @Session() session
  ){
    session.username = undefined;
    session.roles = undefined;
    req.session.destroy();
    return res.redirect('/login')
  }

}
