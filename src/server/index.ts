import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import compression from 'compression';
import RestfulInterceptor from '@server/RestfulInterceptor';
import CustomErrorHandler from '@server/CustomErrorHandler ';
import appWinston from '@server/appWinston';
import { GoogleAuthController } from '@controllers/GoogleAuthController';

const server: Application = express();
server.use(appWinston());
server.use(compression());
useExpressServer(server, {
    development: true,
    controllers: [GoogleAuthController],
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
