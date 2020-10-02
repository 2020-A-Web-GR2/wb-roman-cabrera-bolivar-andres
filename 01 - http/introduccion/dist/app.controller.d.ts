import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    loginPost(res: any, body: any, session: any): any;
    protected(res: any, session: any): any;
    logout(res: any, req: any, session: any): any;
}
