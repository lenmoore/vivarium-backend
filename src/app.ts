import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('hey')
});

app.listen(80, () => {
    console.log('doin it');
})