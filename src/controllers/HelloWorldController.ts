import { Controller, Get } from 'routing-controllers';

@Controller('')
export class HelloWorldController {
    @Get('/hello-world')
    index() {
        return 'hello world!';
    }
}
