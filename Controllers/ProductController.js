const express = require('express');
const proc = express.Router();
const {  } = require('../Models/productModel')
proc.use(express.json());


proc.get('/',(req,res)=>{
    res.status(200)


})


module.exports = proc

