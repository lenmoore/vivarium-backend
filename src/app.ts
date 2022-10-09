import express from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import cors from 'cors';

const port = process.env.PORT || 3000;
// const port = config.get<number>('port');
console.log(port);
const app = express();

app.use(express.json());

app.use(deserializeUser); // on every single request

app.use(
    cors({
        origin: ['http://localhost:8080', 'http://10.0.0.244:8080', '*'],
        credentials: true,
    })
);

app.listen(port, async () => {
    logger.info('running on port ' + port);

    routes(app);
    await connect();
});
