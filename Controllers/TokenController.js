const express = require('express');
const TokenC = express.Router();
const jwt = require('jsonwebtoken');
const { verifyCrosstoken } = require('../Models/userModel');
require ('dotenv').config()

TokenC.get('/', (req,res)=>{

    const auth = req.headers['authorization']
    console.log(req)
    const token = auth && auth.split(' ')[1]
    console.log(token)
    const decoded = jwt.decode(token)
    console.log(decoded)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (e, dec) => {
        if (e) return res.status(403);
   
        res.json(dec)
     
    })
})

TokenC.get('/oauth',async(req,res)=>{
const token = req.query.token
try {
    const result = await verifyCrosstoken(token)
    if (!result) res.status(401).json('unauthorized, cannot find your token')
    res.status(200).json(result)
} catch (error) {
    res.status(500)
    
}
})





module.exports = TokenC