const express = require('express');
const proc = express.Router();
proc.use(express.json());
const { Getproduct, GetproductCat, PopularProduct, GetproductById, NewstProduct, getType } = require('../Models/productModel')


proc.get('/', async (req, res) => {


  try {

    const intlimit = parseInt(req.query.limit)
    let limit
    const id = req.query.id;
    if (id) {
      const result = await GetproductById(id)
      res.json(result)
    }
    else {
      if (!intlimit || intlimit === 'NaN') {
        limit = 20;
      }
      else {
        limit = intlimit
      }
      const hasil = Getproduct(limit).then(re => res.json(re))
    }


  } catch (error) {
    res.status(500)
  }




})



proc.get('/search', async (req, res) => {


  try {
    const baba = await GetproductCat(req.query.q)
    if (baba.length < 1) res.status(404).json({ statuscode: 404, msg: 'Not found' })
    res.json(baba)
  } catch (err) {
    res.status(500)
  }
})

proc.get('/popular', async (req, res) => {
  try {
    const popularProducts = await PopularProduct();
    console.log(popularProducts)

    res.json(popularProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
proc.get('/newest', async (req, res) => {
  try {
    const NewstProducts = await NewstProduct();
    console.log(NewstProducts)
    res.json(NewstProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

proc.get('/get', async (req, res) => {
  try {
    const id = req.query.id
    const result = await GetproductById(id)
    result.info = "We have new endpoint for this. /product?id={id}"
    res.json(result)
  } catch (error) {
    res.status(500)

  }
})
proc.get('/type', async (req, res) => {
  try {
    const id = req.query.type
    const result = await getType(id)
    res.json(result)
  } catch (error) {
    res.status(500)

  }
})


module.exports = proc

