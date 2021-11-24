import env from '@config/env';

export default {
    node: {
        baseUrl: env.asString(process.env.BASE_URL),
        port: env.asNumber(process.env.PORT),
    },
    database: {
        url: env.asString(process.env.DATABASE_URL),
        migrationsRun: env.asBoolean(process.env.DATABASE_RUN_MIGRATIONS),
        synchronize: env.asBoolean(process.env.DATABASE_SYNC),
        logging: env.asBoolean(process.env.DATABASE_LOGGING),
    },
};
