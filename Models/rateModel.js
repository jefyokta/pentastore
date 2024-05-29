const db = require('../Database/Database')

class Rate {
    constructor() {
        this.db = db
    }
    async getRate(productid) {

        const result = await this.db.query(`SELECT SUM(value) / COUNT(*) AS rating FROM rate WHERE productid = ?`, [productid])
        return result
    }
    async updateRating(data) {
        const cek = await this.db.query(`SELECT * FROM rate WHERE productid=?, AND userid=?`, [data.product, data.user])
        if (cek.length > 0) {
            const result = this.db.query(`UPDATE rate SET value = ? WHERE productid =? AND userid = ?`, [data.value, data.product, data.user])
            return true
        }
        else {
            await this.db.query(`INSERT INTO (value,poductid,userid,comment)VALUES (?,?,?)`, [data.value, data.product, data.user, data.comment])
            return true
        }
    }
}


const rate = new Rate()

module.exports = rate