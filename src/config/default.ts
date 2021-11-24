import '@config/env';

export default {
    node: {
        baseUrl: String(process.env.BASE_URL),
        port: Number(process.env.PORT),
    },
};
