import winston, { LoggerOptions } from 'winston';
import expressWinston from 'express-winston';
import { Request, Response } from 'express';
import { UserEntity } from '@database/entities/UserEntity';

interface RequestWithUser extends Request {
    user?: UserEntity;
}

const options: LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.cli(),
};
const logger = winston.createLogger(options);

const appWinston = () =>
    expressWinston.logger({
        winstonInstance: logger,
        colorize: true,
        msg: (req: RequestWithUser, res: Response) => {
            const user = req.user ? req.user.role : 'guest';
            return [
                new Date().toISOString(),
                user,
                req.protocol.toUpperCase(),
                req.method,
                res.statusCode,
                req.path,
                req.originalUrl.split('?').pop(),
                `{{res.responseTime}}ms`,
            ].join('\t');
        },
    });

export default appWinston;
