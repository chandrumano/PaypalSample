const express = require('express');
const bodyParser = require('body-parser');
const queryString = require('querystring');
const request = require('request');
const util = require('util');
const requestAsync = util.promisify(request);

const configurePaypal = require('./src/configure');
configurePaypal();

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.post('/payment', async (request, response) => {
    console.log('webhook received...');
    const body = request.body || {};
    response.sendStatus(200);
    response.end();

    let postRequest = 'cmd=_notify-validate';
    for (const key in body) {
			const value = queryString.escape(body[key]);
			postRequest = postRequest + "&" + key + "=" + value;
    }
    console.log(postRequest);

    var options = {
		url: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr',
		method: 'POST',
		headers: {
			'Connection': 'close'
		},
		body: postRequest
    };
    try {
        const result = await requestAsync(options);
        if (result.statusCode === 200) {
            if (result.body === 'VERIFIED') {
                console.log('IPN Verfied');
            }
            else if (result.body === ' INVALID') {
                console.log('IPN Invalid');
            }
            else {
                console.log('Unexpected response');
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => console.log('Server started in port 3000...'));
