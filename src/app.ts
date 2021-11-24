import 'reflect-metadata';
import appConfig from '@config/index';
import server from '@server/index';
import dbConnection from '@database/index';

const PORT = appConfig.node.port;
const BASE_URL = appConfig.node.baseUrl;

const start = async () => {
    const dbTimeLabel = `Establishing DB connection`;
    console.time(dbTimeLabel);
    await dbConnection.connect();
    console.timeEnd(dbTimeLabel);
    server.listen(PORT, () => {
        console.info(`Starting server on ${BASE_URL}:${PORT}`);
    });
};

console.time('serverStart');
start()
    .then(() => console.timeEnd('serverStart'))
    .catch(console.error);
