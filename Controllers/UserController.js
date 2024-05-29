const express = require('express');
const userc = express.Router();
const {
    Login, Register, Find, PassVerify, Findtoken, Findbyusername, Findbyemail, getcrossToken, Findtoken2, changePassword, setVerifycode,
    FindUsernameOnlyForInternal,
    setVerifyNull,
    updateProfile,
    cekprodukowned,
    ChangeDefaultFoto
} = require('../Models/userModel');
const Logout = require('../middleware/logout');
const { tokenVer } = require('../middleware/tokenVer');
const Mail = require('../etc/mail')


userc.use(express.json());



userc.post('/login', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = req.body


        if (!user) {
            res.status(400).send('Username query parameter is required');
            return;
        }
        const result = await Login(user);

        if (result.status === 404) {
            res.status(404).json('user not found')
            return false;
        }
        if (result.status === 401) {
            res.status(401).json('pw salah')
            return false;
        }

        res.cookie('refreshtoken', result.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ access_token: result.accesstoken })
        next()


    } catch (error) {
        res.status(500).json('gagal')
        throw error

    }
})

userc.post('/register', async (req, res) => {
    try {
        const data = req.body
        const regist = await Register(req.body);
        if (regist.status === 400) {
            res.status(400).json(regist)

        }
        else {
            res.status(200).json(regist)
        }

    } catch (e) {
        console.error('Error during registration:', e);
        throw e
    }
})

userc.get('/', async (req, res) => {

    const username = req.query.u

    if (!username) {
        res.status(400).json({ msg: 'u params diperlukan' })
    }

    try {
        const result = await Findbyusername(username)
        if (result.status === 404) {

            res.json({ status: 404 })
        }
        res.status(200).json(result)

    } catch (error) {
        res.status(500)
    }
})
userc.get('/email', async (req, res) => {

    const username = req.query.e

    if (!username) {
        res.status(400).send(' e params diperlukan')
    }

    try {
        const result = await Findbyemail(username)
        if (result.status === 404) {

            res.json({ status: 404 })
        }
        res.status(200).json(result)

    } catch (error) {
        res.status(500)
    }
})



userc.post('/passv', async (req, res) => {

    try {
        const data = req.body
        const pass = req.body.password
        const user = req.body.username


        if (typeof user === 'undefined' || typeof pass === 'undefined') {
            res.status(400).json({ msg: " username and password is required!" })


        }
        else {
            console.log(typeof user)
            const result = await PassVerify(user, pass)
            res.status(result.status).json(result)

        }

    } catch (error) {
        res.status(500)
    }

})

userc.get('/mydata', async (req, res) => {
    const refresh = req.cookies.refreshtoken
    if (!refresh) res.status(401)
    const user = await Findtoken(refresh)
    console.log(user)
    if (user.status === 404) {
        res.status(401).json('anda tidak memiliki token yang valid')

    }
    res.status(200).json(user.body)
})

userc.get('/crosstoken', async (req, res) => {
    const refresh = req.cookies.refreshtoken
    if (!refresh) res.status(401)
    const token = await getcrossToken(refresh)
    res.status(200).json({ crosstoken: token })

})

userc.post('/changepassword', async (req, res) => {
    const refresh = req.cookies.refreshtoken
    const pasword = req.body.password
    const newpasword = req.body.newpassword
    if (!refresh) res.status(401)
    try {
        const user = await Findtoken2(refresh)
        if (user.body.password != pasword) res.status(401)
        const changed = await changePassword(user.body.id, newpasword)
        if (changed) res.status(200).json('ok')
    } catch (error) {
        console.log(error)
        res.status(500)
    }




})
userc.post('/changepasswordforgotten', async (req, res) => {
    const refresh = req.body.username
    const code = req.body.code
    const newpassword = req.body.newpass
    if (!refresh) res.status(401)
    try {
        const user = await Findbyusername(refresh)
        if (user.body.verifycode == null || '') res.status(402)
        if (user.body.verifycode != code) res.status(401)
        const changed = await changePassword(user.body.id, newpassword)
        await setVerifyNull(user.body.id)
        if (changed) res.status(200).json('ok')
    } catch (error) {
        console.log(error)
        res.status(500)
    }




})
userc.post('/forgotpassword', async (req, res) => {
    try {
        const refresh = req.body.user
        if (!refresh) res.status(402)
        console.log(refresh)
        const result = await FindUsernameOnlyForInternal(refresh)
        const id = result.body.id
        const r = await setVerifycode(id)
        const mail = new Mail(result.body.email, `Your Verify Code for forgotten password Username:${result.body.username}`, `code : ${r.code}`)
        mail.sendMail()
        const email = result.body.email
        const domain = email.split('@')[1]
        const emailname = email.split('@')[0]
        const parsingemail = emailname.slice(0, -2) + 'XX'
        const fullemailparsed = parsingemail + '@' + domain || result.body.email


        res.status(r.status).json({ msg: `Verify code has sent to your email ${fullemailparsed}` })
    } catch (error) {
        console.log(error)
        res.status(500)
    }


})
userc.post('/verifycode', async (req, res) => {

    const code = req.body.code
    const username = req.body.username
    try {
        const result = await FindUsernameOnlyForInternal(username)
        if (result.body.verifycode == code) {
            res.status(200).json({ ok: true })
        }
        else {
            res.status(401).json({ ok: false })
        }


    } catch (error) {
        res.status(500)

    }

})

userc.post('/update', async (req, res) => {
    const data = req.body

    const id = data.id
    if (!id) res.status(401)
    await updateProfile(data)
    res.status(200)



})
userc.post("/updatephotodefault", async (req, res) => {
    const foto = req.body.gambar
    const refreshToken = req.cookies.refreshtoken
    if (!refreshToken) { res.status(401) }
    if (!foto) { res.status(400).json({ msg: "gambar is required" }) }
    try {
        console.log('Calling ChangeDefaultFoto with:', foto, refreshToken);
        const r = await ChangeDefaultFoto(foto, refreshToken)
        if (r.affectedRows > 0) {
            res.status(200).json('ok')
        }
        else {
            res.status(400).json('400')
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error)

    }

})

userc.post("/productownedcheck", async (req, res) => {
    const data = req.body.username
    const id = req.body.id
    console.log(data)
    if (!data) res.status(402)
    try {
        const { msg } = await cekprodukowned(data, id)
        console.log(msg)
        res.json(msg)
    } catch (error) {
        console.log(error)
        res.status(500).json("something went wrong")

    }
})


userc.delete('/logout', Logout)

module.exports = userc