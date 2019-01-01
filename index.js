const express = require('express');
const configurePaypal = require('./src/configure');

configurePaypal();

const app = express();

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.post('/payment', (request, response) => {
    console.log('webhook received...');
    response.sendStatus(200);
});

app.listen(3000, () => console.log('Server started in port 3000'));
