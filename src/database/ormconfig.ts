import CakePhpNamingStrategy from '@database/CakePhpNamingStrategy';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import appConfig from '@config/index';

const dbConfig: MysqlConnectionOptions = {
    type: 'mariadb',
    url: appConfig.database.url,
    charset: 'utf8mb4',
    timezone: 'Z',
    namingStrategy: new CakePhpNamingStrategy(),
    synchronize: appConfig.database.synchronize,
    logging: appConfig.database.logging,
    migrationsRun: appConfig.database.migrationsRun,
    entities: [`${__dirname}/entities/*.{js,ts}`],
    migrations: [`${__dirname}/migrations/*.ts`],
    subscribers: [`${__dirname}/subscribers/*.ts`],
    cli: {
        entitiesDir: `${__dirname}/entities`,
        migrationsDir: `${__dirname}/migrations`,
        subscribersDir: `${__dirname}/subscribers`,
    },
};

export default dbConfig;
