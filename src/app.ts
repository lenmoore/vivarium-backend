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

// use the express-static middleware
app.use(express.static('public'));
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
            'https://10.0.0.244:80/',
            '*',
        ],
        credentials: true,
    })
);

// const key = fs.readFileSync('./localhost-key.pem');
// const cert = fs.readFileSync('./localhost.pem');
// const server = https.createServer({ key: key, cert: cert }, app);

// server.listen(port, async () => {
app.listen(port, async () => {
    console.log('Broo;');
    logger.info('running on port ' + port);

    routes(app);
    // await connect();
});
