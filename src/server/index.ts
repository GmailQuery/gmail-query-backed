import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import compression from 'compression';
import { HelloWorldController } from '@controllers/HelloWorldController';
import RestfulInterceptor from '@server/RestfulInterceptor';
import CustomErrorHandler from '@server/CustomErrorHandler ';
import appWinston from '@server/appWinston';

const server: Application = express();
server.use(appWinston());
server.use(compression());
useExpressServer(server, {
    development: true,
    controllers: [HelloWorldController],
    interceptors: [RestfulInterceptor],
    defaultErrorHandler: false,
    middlewares: [CustomErrorHandler],
    cors: true,
    classTransformer: true,
    validation: true,
    defaults: {
        paramOptions: {
            required: true,
        },
    },
});

export default server;
