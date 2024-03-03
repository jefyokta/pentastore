const express = require('express');
const router = express.Router();
const UserC = require('../Controllers/UserController')
const ProC =  require('../Controllers/ProductController')
const OrderC =  require('../Controllers/ProductController')
router.use(express.json());
router.get('/',(req,res)=> res.json('haiiii'))
router.use('/user', UserC);
router.use('/product', ProC);
router.use('/order', OrderC)


module.exports = router