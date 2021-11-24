import { getConnectionManager } from 'typeorm';
import dbConfig from '@database/ormconfig';

const dbConnection = getConnectionManager().create(dbConfig);
export default dbConnection;
