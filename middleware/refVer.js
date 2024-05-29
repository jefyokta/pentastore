const jwt = require('jsonwebtoken')
const { Findtoken } = require('../Models/userModel')
require('dotenv').config()

const refreshtoken = async (req, res) => {
    try {
        const reftoken = req.cookies.refreshtoken
        console.log(req.cookies);
        if (!reftoken) return res.sendStatus(401);
        const user = await Findtoken(reftoken)
        if (!user) return res.sendStatus(403);
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            gambar: user.gambar,
            role: user.role
        }
        const accesstoken =  jwt.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: '20s',
        })
        res.json({ accesstoken })


    } catch (error) {
        console.log(error);
    }

}
module.exports = refreshtoken
