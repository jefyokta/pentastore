const express = require("express");
const router = express.Router();
const UserC = require("../Controllers/UserController");
const ProC = require("../Controllers/ProductController");
const TransactionC = require("../Controllers/TranscationController");
const refreshtoken = require("../middleware/refVer");
const { tokenVer } = require("../middleware/tokenVer");
const TokenC = require("../Controllers/TokenController");
const path = require('path');
const notif = require("../Controllers/NotifController");
const Mail = require('../etc/mail');
const ratec = require("../Controllers/RateController");

router.use(express.json());
router.get("/", (req, res) => res.json({ msg: "Gaskennnn" }));
router.get("/token", refreshtoken);
router.get('/error', (req, res) => res.status(req.query.error || 500).json(`err ${req.query.error || 500}`))
router.use("/user", UserC);
router.use("/product", ProC);
router.use("/transaction", TransactionC);
router.use("/actoken", TokenC);
router.use("/notif", notif);
router.use("/rating", ratec);
router.get("/img", async (req, res) => {
    const svg = req.query.id
    const pathfile = path.join(__dirname, `/img/${svg}.svg`)
    res.sendFile(pathfile)

});
router.get('/test', (req, res) => {
    res.render('test', data = req.headers)
    console.log(req.socket.remoteAddress)
    console.log(req.ips)
})
router.get('/docs', (req, res) => res.render('docs'))


module.exports = router;
