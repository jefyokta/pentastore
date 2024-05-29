const jwt = require('jsonwebtoken')
const { Findtoken, UpdateToken } = require('../Models/userModel')
require('dotenv').config()

const Logout = async (req, res) => {
    try {
        const reftoken = req.cookies.refreshtoken
        console.log(req.cookies);
        if (!reftoken) return res.sendStatus(401);
        const user = await Findtoken(reftoken)
        console.log(user.body.id)
        if (user.status == 404) return res.sendStatus(403);
        const result = await UpdateToken(user.body.id,null)
        console.log(result);
        if (result.status === 200) {
            res.clearCookie('refreshtoken')
            res.sendStatus(200)

        }





    } catch (error) {
        console.log(error);
    }

}
module.exports = Logout
