import express from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import cors from 'cors';
import https from 'https';
import config from 'config';
import * as fs from 'fs';

const port = process.env.PORT || 3000;
// const port = config.get<number>('port');
console.log(port);
const app = express();
app.use(deserializeUser); // on every single request

app.use(express.json());

app.use(
    cors({
        origin: [
            'http://localhost:8080',
            'https://localhost:8080',
            'https://192.168.1.153:8080',
            'http://192.168.1.153:8080',
            'http://10.0.0.244:8080',
            'https://192.168.1.153:8080',
            'http://192.168.8.102:8080',
            'https://192.168.8.102:8080',
            'http://192.168.1.153:8080',
            'https://192.168.1.153:8080',
            'https://192.168.1.187:8080',
            'http://192.168.1.187:8080',
            '*',
        ],
        credentials: true,
    })
);
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const server = https.createServer({ key: key, cert: cert }, app);

server.listen(port, async () => {
    // app.listen(port, async () => {
    logger.info('running on port ' + port);

    routes(app);
    await connect();
});
