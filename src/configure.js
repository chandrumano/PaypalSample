const paypal = require('paypal-rest-sdk');

//these keys will be stored in a database encrypted.
module.exports = () => {
    paypal.configure({
        mode: 'sandbox',
        client_id: 'AT3vv_XjfJQ6jWcZvKZZ5Qo34Ddagd-PaNYGntWBK2OipAenu_qNpE038RmY0KaWhGVZ92JpckbMjL3A',
        client_secret: 'EOOGersgociBXXbPgwWf3p2bpg7h49n50l0mE720HrmTP9dhEWcLg2R7BktDlkwM2Uf3UT9D0tBBpFyC'
    });
};

// module.exports = configurePaypal;
