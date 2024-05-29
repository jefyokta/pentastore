const db = require('../Database/Database')
const jwt = require('jsonwebtoken')
const express = require('express')
const userx = express()
require('dotenv').config()
const pentaFunctions = require('../etc/Functions')

const table = 'users';


const Register = async (user) => {
    const user1 = user.username;
    const em = user.email;
    const pw = user.password;
    const nm = user.name;
    const aduser = await Find(user1)
    const admail = await Find(em)
    if (admail.status === 200 || aduser.status === 200) {
        return {
            status: 400,
            body: { message: ' username/email tersedia!' }
        }

    }
    else {
        try {
            const rows = await db.query(
                `INSERT INTO ${table} (username, email, password , nama) VALUES (?, ?, ?, ?)`,
                [user1, em, pw, nm]
            );

            if (rows) return { status: 200 }
        } catch (error) {

            console.error('Error during registration:', error);
            throw error;
        }
    }


};
const Login = async (user) => {
    try {
        console.log(user)
        const username = user.username
        const email = user.email
        const password = user.password
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE username = ? OR email = ? `,
            [username, email]
        );
        if (rows) {
            if (password === rows.password) {

                const payload = {
                    id: rows.id,
                    username: rows.username,
                    email: rows.email,
                    gambar: rows.gambar,
                    role: rows.role
                }
                const loadc = {
                    id: rows.id
                }

                const token = jwt.sign(payload, process.env.SECRET_KEY)
                const accesstoken = jwt.sign(loadc, process.env.ACCESS_TOKEN, {
                    expiresIn: '20s'
                })

                const userdata = jwt.decode(token)
                console.log(userdata)

                const up = await db.query("UPDATE users SET refreshtoken = ? WHERE id = ?", [token, userdata.id])
                if (up) return {
                    accesstoken,
                    token
                }



            }
            return {
                status: 401,
                message: "pass salah"

            };
        }
        return {
            status: 404,
            message: "user not found"

        }



    } catch (error) {
        throw error

    }

}

const Find = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE username = ? OR email = ?`,
        [username, username]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {

            id: rows.id,
            username: rows.username,
            email: rows.email,
            role: rows.role,
            image: rows.gambar,

        }
    }
}
const Findbyusername = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE username = ?`,
        [username]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {

            id: rows.id,
            username: rows.username,
            email: rows.email,
            role: rows.role,
            image: rows.gambar,


        }
    }
}
const FindUsernameOnlyForInternal = async (username) => {
    try {
        const [row] = await db.query(`SELECT * FROM users WHERE username = ?`, [username])
        return {
            status: 200,
            body: row

        }

    } catch (error) {
        console.log(error)
        return {
            status: 500
        }

    }
}
const Findbyemail = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE email = ?`,
        [username]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {

            id: rows.id,
            username: rows.username,
            email: rows.email,
            role: rows.role,
            image: rows.gambar,

        }
    }
}








const Findtoken = async (token) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE refreshtoken = ?`,
        [token]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {
            username: rows.username,
            id: rows.id,
            email: rows.email,
            gambar: rows.gambar,
            role: rows.role,
            nama: rows.nama,
            createat: rows.createat,
            updateat: rows.lastupdate

        }



    }
}
const Findtoken2 = async (token) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE refreshtoken = ?`,
        [token]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {
            username: rows.username,
            id: rows.id,
            email: rows.email,
            gambar: rows.gambar,
            role: rows.role,
            nama: rows.nama,
            createat: rows.createat,
            updateat: rows.lastupdate,
            password: rows.password,
            verifycode: rows.verifycode

        }



    }
}
const UpdateToken = async (userId, refreshToken) => {
    try {
        if (!userId) {
            throw new Error('Invalid userId ');
        }

        const result = await db.query(`UPDATE users SET refreshtoken = ? WHERE id = ?`, [refreshToken, userId]);

        if (result) {
            return {
                status: 200,
                result
            }
        } else {
            return {
                status: 500,
                message: 'Failed to update refreshToken'
            }
        }

    } catch (error) {
        console.error('Error updating refreshToken:', error.message);
        return { status: 500, message: error.message };
    }
}

const FindPriv = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE username = ?`,
        [username]
    )
    if (!rows) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: {

            id: rows.id,
            username: rows.username,
            email: rows.email,
            role: rows.role,
            image: rows.gambar,
            password: rows.password

        }
    }
}

const PassVerify = async (username, pass) => {
    try {
        const result = await FindPriv(username)
        if (result.status === 200) {
            const verify = pass === result.body.password
            if (verify) {
                return {
                    status: 200,
                    body: {
                        message: 'ok'
                    }
                }

            }
            else {
                return {
                    status: 401,
                    body: {
                        message: 'pass salah'
                    }
                }
            }
        } else {
            return result.status
        }
    } catch (error) {
        return {
            status: 500
        }
    }


}
const getcrossToken = async (refreshtoken) => {


    const data = await Findtoken(refreshtoken)
    const token = jwt.sign(data.body, process.env.ACCESS_TOKEN)
    const result = await db.query(`UPDATE users SET crosstoken = ? WHERE refreshtoken= ?`, [token, refreshtoken])
    return token



}
const verifyCrosstoken = async (crosstoken) => {
    try {
        const [result] = await db.query('SELECT * FROM users WHERE `crosstoken` = ?', [crosstoken])
        console.log(result)
        if (result) {
            return result
        } else {
            return false


        }

    } catch (error) {
        console.log(error)

    }
}

const FindById = async (id) => {


    try {
        const [row] = await db.selectByid('users', id)
        return row

    } catch (error) {
        console.log(error)
        return false
    }

}
const changePassword = async (id, newpass) => {
    try {
        await db.query("UPDATE users SET password = ? , lastupdate=NOW() WHERE id = ?", [newpass, id])
        return true
    } catch (error) {
        console.log(error)
        return false

    }

}
const setVerifycode = async (id) => {
    try {
        const vcode = new pentaFunctions()
        const code = vcode.generateVerifyCode()
        await db.query("UPDATE users SET verifycode = ? WHERE id = ?", [code, id])
        return { status: 200, code: code }

    } catch (error) {
        console.log(error)
        return { status: 500 }

    }
}
const setVerifyNull = async (id) => {
    try {
        await db.query(`UPDATE users SET verifycode = NULL WHERE id =?`, [id])
        return true
    } catch (error) {
        console.log(error)
        return false

    }
}

const updateProfile = async (data) => {
    try {

        await db.query("UPDATE users SET email = ?, nama =? WHERE id = ? , lastupdate=NOW()", [data.email, data.nama, data.id])
    } catch (error) {
        console.log(error)
        return false

    }
}
const updatefoto = async (data) => {



    try {
        await db.query("UPDATE users SET gambar = ?, lastupdate=NOW() WHERE id=?", [data.gambar, data.id])
    } catch (error) {
        console.log(error)
        return false

    }
}

const updateusername = async (data) => {
    try {
        await db.query("UPDATE users SET username =? , lastupdate=NOW() WHERE id = ?", [data.username, data.id])

    } catch (error) {
        console.log(error)
        return false

    }
}

const cekprodukowned = async (username, id) => {
    const r = await db.query("SELECT * FROM users WHERE username =?", [username])
    console.log(r)
    if (r.length == 0) return { msg: "you even not an user of penta store" }
    const userid = r[0].id
    if (userid == 5) return { msg: "hei jefy pls complete this shit" }
    const [result] = await db.query("SELECT * FROM pesanan WHERE user =? AND idproduk= ?", [userid, id])
    if (!result) return { msg: "poor guy,even  you've bought nothing" }
    if (result.status == "1") return { msg: "you own this app, please wait developers complete thiss app to use it" }
    return { msg: "You dont have this app, Buy it now in pentastore" }
}
const ChangeDefaultFoto = async (gambar, refreshtoken) => {

    try {

        const r = await db.query("UPDATE users SET gambar = ? WHERE refreshtoken = ?", [gambar, refreshtoken])
        console.log(r.affectedRows)
        return r
    } catch (error) {
        console.log(error)
        return r = {
            affectedRows: 0
        }

    }
}





module.exports = {
    Register,
    Login,
    Find,
    Findtoken,
    Findtoken2,
    PassVerify,
    UpdateToken,
    Findbyusername,
    Findbyemail,
    getcrossToken,
    verifyCrosstoken,
    FindById,
    changePassword,
    setVerifycode,
    FindUsernameOnlyForInternal,
    setVerifyNull,
    updateProfile,
    updatefoto,
    updateusername,
    cekprodukowned,
    ChangeDefaultFoto
}