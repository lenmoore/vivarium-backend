import express from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import cors from 'cors';
import https from 'https';
import config from 'config';
import * as fs from 'fs';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
// const port = config.get<number>('port');
// console.log(port);
const app = express();
app.use(deserializeUser); // on every single request

app.use(bodyParser({ limit: '1gb' }));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb' }));
app.use(express.json());
// use the express-static middleware
app.use(express.static('public'));

const herokuapi = 'https://api-vivaarium.herokuapp.com/api';
const sitt = 'http://localhost:3000/api';
const corsAnywhere = 'https://ancient-oasis-40097.herokuapp.com/';
const vatheroku = 'https://vat-vivaarium.herokuapp.com';
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
            'https://10.0.0.244:8080',
            'http://10.0.0.244:8080',
            'https://172.16.1.206:8080',
            'http://172.16.1.206:8080',
            'https://10.0.0.244:8080',
            'http://10.0.0.244:8080',
            'https://192.168.237.106:8080',
            'http://192.168.237.106:8080',
            'https://192.168.1.166:8080',
            'https://192.168.237.106:80/',
            'http://127.0.0.1:5173',
            'https://127.0.0.1:5173',
            'https://192.168.95.106:8080',
            'http://192.168.95.106:8080',
            'https://10.0.0.244:80/',
            'https://192.168.95.106:8080/',
            'https://192.168.95.106:8080',
            'https://vat-vivaarium.herokuapp.com/',
            'https://www.vat-vivaarium.ee',
            'https://vat-vivaarium.ee',
            'http://vat-vivaarium.ee',
            herokuapi,
            corsAnywhere,
            vatheroku,
            sitt,
            '*.herokuapp.com',
            '*',
        ],
        credentials: true,
    })
);
// app.use(cors()); // comment this for deploy
// and do app.listen for deploy
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');
const server = https.createServer({ key: key, cert: cert }, app);

// server.listen(port, async () => {
app.listen(port, async () => {
    // console.log('Broo;');
    logger.info('running on port ' + port);

    routes(app);
    await connect();
});
