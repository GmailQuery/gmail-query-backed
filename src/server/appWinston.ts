import winston, {LoggerOptions} from 'winston';
import expressWinston from 'express-winston';
import {Request, Response} from "express";

interface CustomRequest extends Request {
    user: any
}

const options: LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.cli()
};
const logger = winston.createLogger(options);

const appWinston = () =>
    expressWinston.logger({
        winstonInstance: logger,
        colorize: true,
        msg: (req: CustomRequest, res: Response) => {
            const user = req.user || 'guest'
            return [
                (new Date()).toISOString(),
                user,
                req.protocol.toUpperCase(),
                req.method,
                res.statusCode,
                req.path,
                req.originalUrl.split("?").pop(),
                `{{res.responseTime}}ms`
            ].join('\t')
        },
    });

export default appWinston;
