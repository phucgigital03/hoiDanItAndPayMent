const dotenv = require('dotenv')
dotenv.config()
const fetch = require('node-fetch');
const stripe = require('stripe')(process.env.STRIPE_APP_SECRET);

const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};

class checkOutsController{
    //[get]: /checkOut
    async renderCheckOut(req,res,next){
        try{
            const clientToken = await checkOutsController.generateAccessToken();
            return res.render('checkOut.ejs',{
                clientToken: clientToken,
                clientId: process.env.PAYPAL_CLIENT_ID,
                merchantId: `Q26FQQCWRWMFS`,
                clientIDStripe: process.env.STRIPE_CLIENT_ID
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    static async generateAccessToken(){
        const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_APP_SECRET).toString("base64")
        const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
          method: "POST",
          body: "grant_type=client_credentials",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });
        const data = await response.json();
        return data.access_token;
    }

    // use the orders api to create an order
    static async createOrderPayPal(cart){
        const total = cart.reduce((total,product)=>{
            total = total + product.price;
            return total
        },0).toString().split('')
        total[2] = '.'
        const accessToken = await checkOutsController.generateAccessToken();
        const url = `${baseURL.sandbox}/v2/checkout/orders`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: `${total.join('')}`,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: `${total.join('')}`,
                                }
                            }
                        }
                    },
                ],
            }),
        });
        const data = await response.json();
        return data;
    }

    // use the orders api to capture payment for an order
    static async capturePayment(orderId) {
        const accessToken = await checkOutsController.generateAccessToken();
        const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    }
  
    //[post]: /create-paypal-order
    async createOrder(req,res,next){
        try{
            const cart = req.body.cart
            console.log(cart)
            const order = await checkOutsController.createOrderPayPal(cart)
            return res.status(200).json({
                errorCode: 0,
                order: order,
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    //[post]: /capture-paypal-order
    async captureOrder(req,res,next){
        try{
            const { orderID } = req.body;
            const captureData = await checkOutsController.capturePayment(orderID);
            // TODO: store payment information such as the transaction ID
            return res.status(200).json({
                errorCode: 0,
                captureData: captureData
            });
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    // [post]: /createOrderStipe
    async createOrderStripe(req,res,next){
        try{
            const items = req.body.items
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 200000,
                currency: "vnd",
                automatic_payment_methods: {enabled: true},
                shipping: {
                    phone: '0338',
                    address: {
                        city: 'phan rang',
                    },
                    name: 'test 1'
                },
            });
            return res.status(200).json({
                errorCode: 0,
                clientSecret: paymentIntent.client_secret
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }

    // [get]: /ordered
    async orderedStripe(req,res,next){
        try{
            const { paymentId } = req.query
            const paymentIntent = await stripe.paymentIntents.retrieve(
                paymentId
            );
            return res.status(200).json({
                errorCode: 0,
                data: paymentIntent
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                message: 'error server'
            })
        }
    }
}

module.exports = new checkOutsController()