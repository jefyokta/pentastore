const Database = require('../Database/Database')
const user = require('./userModel')


class NotifModel {
    constructor() {
        this.notif = Database
    }


    async sendNotif(to, text, redirect, orderid) {
        try {

            const sent = await this.getNotifOrderId(orderid)
            console.log(sent)
            if (sent > 0) return true
           const r = await this.notif.query("INSERT INTO `notifications` (`user`,`text`,`redirect`,`orderid`) VALUES (?,?,?,?)", [to, text, redirect, orderid])
           console.log(r)
            return true
        } catch (error) {
            console.log(error)
            return false

        }
    }
    async getNotif(user) {
        try {
            return await this.notif.query("SELECT * FROM `notifications` WHERE user=?", [user])

        } catch (error) {
            console.log(error)

        }

    }
    async deleteNotif(refreshtoken, notifid) {
        try {
            const [row] = await this.notif.query("SELECT * FROM users WHERE refreshtoken = ?", [refreshtoken])
            const [notifdetails] = await this.notif.query("SELECT * FROM notifications WHERE id = ?", [notifid])
            if (row.id == notifdetails.user) {
                await this.notif.query("DELETE FROM notifications WHERE id=?", [notifid])
                return {
                    status: 200
                }
            }
            else {
                return { status: 401 }
            }

        } catch (er) {
            console.log(er)
        }
    }
    async getNotifOrderId(id) {
        const row = await this.notif.query("SELECT * FROM notifications WHERE orderid = ?", [id])
        console.log(row)
        return row.length

    }
}

const notif = new NotifModel();
module.exports = notif