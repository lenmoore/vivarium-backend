import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

function connect() {
    let dbUri = '';
    dbUri = config.get<string>('dbUri');

    return mongoose
        .connect(dbUri)
        .then(() => {
            logger.info('connected to db');
        })
        .catch((err) => logger.error(err));
}

export default connect;
