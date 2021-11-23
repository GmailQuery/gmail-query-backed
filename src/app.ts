import 'reflect-metadata';
require('dotenv').config()

import appConfig from "@config/index";
import server from "@server/index"

const PORT = appConfig.node.port;
server.listen(PORT, () => {
    console.info(`Starting server on http://localhost:${PORT}`);
})
