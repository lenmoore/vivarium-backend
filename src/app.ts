import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import helmet from 'helmet';

const port = config.get<number>('port');
console.log(port);
const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(helmet.crossOriginEmbedderPolicy({ policy: 'credentialless' }));

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
    logger.info('running on port ' + port);

    routes(app);
    await connect();
});
