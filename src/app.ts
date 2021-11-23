import 'reflect-metadata';
import appConfig from '@config/index';
import server from '@server/index';

const PORT = appConfig.node.port;
const BASE_URL = appConfig.node.baseUrl;
server.listen(PORT, () => {
    console.info(`Starting server on ${BASE_URL}:${PORT}`);
});
