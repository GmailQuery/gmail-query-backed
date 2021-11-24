import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const asString = (path: string): string => String(path);
const asBoolean = (path: string): boolean => path === 'true';
const asNumber = (path: string): number => Number(path);

export default { asString, asBoolean, asNumber };
