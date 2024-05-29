const { default: axios } = require('axios');
const express = require('express');
const TransactionC = express.Router();
const fetch = require('node-fetch')
const { updateOrder, userOrder, insertOrder, orderOwner, userOrderv2, getOrder, selectbyid } = require('../Models/orderModel')
const { v4: uuidv4 } = require('uuid');
const { tokenVer } = require('../middleware/tokenVer');
const crypto = require('crypto')
hash = crypto.createHash('sha512')

const notif = require('../Models/notifModel');
const { FindById } = require('../Models/userModel');
const { GetproductById } = require('../Models/productModel');
require('dotenv').config()



TransactionC.get('/notification', (req, res) => {
    res.status(200).json({
        transaction_details: { order_id: uuidv4(), gross_amount: `product.harga` },
        item_details: [{
            id: `product.id`,
            price: `product.harga`,
            quantity: 1,
            name: `product.product`
        }],
        credit_card: { secure: true }
    })

})

TransactionC.post('/', async (req, res) => {
    const auth = Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString('base64')
    const product = req.body
    const orderid = uuidv4()
    console.log(product);
    const data = {
        transaction_details: { order_id: orderid, gross_amount: product.harga },
        item_details: [{
            id: product.id,
            price: product.harga,
            quantity: 1,
            name: product.product,
            user: product.userid
        }],
        customer_details: {
            first_name: product.name,
            email: product.email
        },
        credit_card: { secure: true }
    }
    const config = {
        headers: {
            ContentType: 'Application/json',
            Authorization: `Basic ${auth}`
        }
    }


    const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    try {
        const result = await axios.post(url, data, config)
        console.log(result.data)
        const dt = {
            id: orderid,
            details: {
                userid: product.userid,
                token: result.data.token,
                id: product.id,
                harga: product.harga
            },
            token: result.data.token

        }

        await insertOrder(dt)

        res.status(200).json(result.data.token)
    } catch (error) {
        res.status(500).json("Midtrans Error")
        console.log(error)

    }

})

TransactionC.get('/getstatus', async (req, res) => {
    const id = req.query.id
    try {

        const response = await axios.get(`https://pentatransaction.vercel.app/order?id=${id}`)
        console.log('ini mek:' + response.data.orderid)
        console.log(response.data.status)
        if (response.data.status == '200') {

            if (response.data.status == '200') {
                const user = await orderOwner(id)

                try {
                    const userdetails = await FindById(user.user)
                    const produts = await GetproductById(user.idproduk)
                    // console.log(userdetails)
                    const pesan = ` Hi ${userdetails.nama}, pesanan produk ${produts.product} anda dengan id ${id} telah berhasil dicapture. Ayo cek order List Anda`
                    const r = await updateOrder(id)
                    console.log(r)
                    await notif.sendNotif(user.user, pesan, 'test', id);
                } catch (error) {
                    console.log(error)

                }

                res.status(200).json('success')

            }
            else {
                res.status(200).json('unpaid')
            }
        }
        else {
            res.json("oops, something went wrong")
        }
    } catch (error) {
        console.log(error.response.status)
        if (error.response.status == 404) {
            res.status(200).json('not found')
        }
        else {

            res.status(500).json("internal server err")
        }
    }

})
TransactionC.get('/userorder', async (req, res) => {
    const userid = req.query.userid
    const option = req.query.o
    try {
        // console.log(option)
        const response = await userOrder(userid, option)
        // console.log(response)
        if (response.length > 0) {
            // console.log(response)
            res.status(200).json(response)

        }
        else if (response.length == 1) {
            res.status(404).json('not found')
        }
        else {
            res.status(500)
        }



    } catch (error) {
        res.status(500).json("internal server err")
    }

})
TransactionC.get('/userorder2', async (req, res) => {
    const userid = req.query.userid

    try {

        const response = await userOrderv2(userid)
        if (response.length > 0) {
            console.log(response)
            res.status(200).json(response)

        }
        else if (response.length == 0) {
            res.status(404).json('not found')
        }
        else {
            res.status(500)
        }



    } catch (error) {
        res.status(500).json("internal server err")
    }

})
TransactionC.get('/order', async (req, res) => {
    const orderid = req.query.orderid
    if (!orderid) res.status(400).json('orderid is required')
    const result = await getOrder(orderid)
    res.status(200).json(result)

})
TransactionC.post('/notifhandler', async (req, res) => {
    const data = req.body;
    if (!req.body) {
        return res.status(400).json({ error: 'Bad request: No data received' });
    }
    const { order_id, status_code, gross_amount, signature_key } = data;
    const sign = order_id + status_code + gross_amount + process.env.MIDTRANSKEY
    const shouldbesign = hash.update(sign).digest('hex')
    console.log(data)

    if (shouldbesign == signature_key) {
        try {

            const ada = await selectbyid(order_id);
            if (ada.length > 0) {
                if (status_code == 200) {
                    const result = await updateOrder(order_id);
                }
                return res.status(200).json(status_code);
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }


    }
    else {
        res.status(401).json('unauthorize')
    }


})


module.exports = TransactionC