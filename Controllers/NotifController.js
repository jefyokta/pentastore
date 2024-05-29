const express = require('express');
const Notif = require('../Models/notifModel')
const notif = express.Router()


notif.delete('/', async (req, res) => {
    const refreshtoken = req.cookies.refreshtoken
    const notifid = req.query.id
    try {

        const result = await Notif.deleteNotif(refreshtoken, notifid)
        res.status(result.status)
    } catch (error) {
        console.log(error)
        res.status(500)

    }

})
notif.get('/', async (req, res) => {
    const user = req.query.userid
    try {
        const result = await Notif.getNotif(user)
        res.json(result);

    } catch (error) {
        console.log(error)
        res.status(500)
    }
})





module.exports = notif

