const express = require('express');
const ratec = express.Router();
ratec.use(express.json());
const rate = require('../Models/rateModel')



ratec.get('/', async (req, res) => {
    const id = req.query.productid
    if (!id) res.status(400).json('badrequest')
    try {
        const [result] = await rate.getRate(id)

        res.status(200).json({rating:result.rating.slice(0, 3)})

    } catch (error) {
        res.status(500)

    }



})
ratec.post('/',async(req,res)=>{
    const data = req.body.data
    try {
       const result = await rate.updateRating(data)
       res.json('ok')
    } catch (error) {
        res.status(500)
        
    }
})


module.exports = ratec