const jwt = require('jsonwebtoken')
require('dotenv').config()

 const tokenVer = (req,res, next)=>{
    console.log(req)
    const auth = req.headers['authorization']
    const token =auth && auth.split(' ')[1]
    if(token == null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN,(e, dec)=>{
        if(e) return res.sendStatus(403);
        req.username = dec.username
        next()
    })

}
module.exports ={
    tokenVer
}