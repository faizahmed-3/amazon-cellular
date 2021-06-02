const ngrok = require('ngrok');
const config = require('config');
const datetime = require('node-datetime');
const axios = require('axios');

const shortcode = config.get('SHORTCODE');
const passkey = config.get('PASSKEY');
const consumerKey = config.get('CONSUMER_KEY');
const consumerSecret = config.get('CONSUMER_SECRET');

async function ngrokStart() {
   return  await ngrok.connect({authtoken: '1tLVNy7Vggkaew4A7FbAB3YJYK9_5mCPZe649VBS8UQ9wRue3', addr: 3000});
}

const newPassword = () => {
    const dt = datetime.create();
    const formatted = dt.format('YmdHMS');

    const passString = shortcode + passkey + formatted;
    return {
        timestamp: formatted,
        password: Buffer.from(passString).toString('base64')
    };
}

exports.accessToken = (req, res, next) => {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = "Basic " + Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
    const headers = {
        Authorization: auth
    }

    axios.get(url, {headers})
        .then(response => {
            req.access_token = response.data;
            next()
        })
        .catch(reason => console.log(reason));
}

exports.stkPush = async (req, res) => {
    const {access_token} = req.access_token;

    const headers = {
        Authorization: 'Bearer ' + access_token
    }

    const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const {timestamp, password} = newPassword();

    const phone = "254705063256"

    const ngrokUrl = await ngrokStart()

    const data = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": "1",
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": `${ngrokUrl}/orders/paying`,
        "AccountReference": "Amazon Cellular Test",
        "TransactionDesc": "Lipa na M-PESA"
    }

    axios.post(stkUrl, data, {headers})
        .catch( () => {
            req.session.paymentError = 'Error in establishing connection to M-PESA';
            res.redirect('/checkout');
        })
}