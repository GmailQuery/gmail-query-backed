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
    google: {
        clientId: env.asString(process.env.GOOGLE_CLIENT_ID),
        clientSecret: env.asString(process.env.GOOGLE_CLIENT_SECRET),
        redirectUri: env.asString(process.env.GOOGLE_REDIRECT_URI),
    },
    auth: {
        userJwtSecret: env.asString(process.env.USER_JWT_SECRET),
    },
};
