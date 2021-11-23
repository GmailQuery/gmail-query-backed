import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response } from 'express';
import AppErrorWrapper, { WrappableError } from '@errors/AppErrorWrapper';

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: WrappableError, request: Request, response: Response) {
        let jsonCompatibleError = error;

        if (!error.toJSON) {
            jsonCompatibleError = new AppErrorWrapper(error);
        }
        response.status(jsonCompatibleError.httpCode).json(jsonCompatibleError.toJSON());
    }
}
