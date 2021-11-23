import {Controller, Get, QueryParam, Req, Res} from 'routing-controllers';
import {Request, Response} from "express";

@Controller('')
export class HelloWorldController {
    @Get('/hello-world')
    index(@Req() req:Request, @Res() res:Response) {
        return "hello world!";
    }

    @Get('/')
    test(@Req() request: Request, @Res() response: Response) {
        return {
            foo: JSON.stringify(request.toString())
        }
    }
}
