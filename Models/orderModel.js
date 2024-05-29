const db = require('../Database/Database')
const express = require('express')
require('dotenv').config()
const uuid = require("uuid")



const updateOrder = async (orderid) => {

    try {

        const rows = await db.query(`UPDATE pesanan SET status = '1' WHERE id = ?`, [orderid])
        if (rows) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error)
    }



}


const userOrder = async (userid, option = null) => {
    try {
        console.log('option :'+option)
        const query = option == null || option == '' ? await db.query(`SELECT pesanan.* ,product.harga,product.gambar,product.tech,product.product,product.link FROM pesanan INNER JOIN product ON pesanan.idproduk = product.id WHERE pesanan.user = ?`, [userid]) : await db.query(`SELECT pesanan.* ,product.harga,product.gambar,product.tech,product.product,product.link FROM pesanan INNER JOIN product ON pesanan.idproduk = product.id WHERE pesanan.user = ? AND status = ?`, [userid, option])

        console.log(query)
        if (query) {
            return query
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
const insertOrder = async (data) => {
    try {
        const product = data.details
        await db.query('INSERT INTO `pesanan`(`id`, `idproduk`, `qty`, `total`, `token`, `user`) VALUES (?,?,?,?,?,?)', [data.id, product.id, 1, product.harga, product.token, product.userid])
    } catch (error) {
        console.log(error)
        return false

    }
}

const orderOwner = async (orderid) => {
    try {
        const [row] = await db.query('SELECT * FROM pesanan WHERE id = ?', [orderid])
        return row
    } catch (error) {
        console.log(error)
        return false

    }
}
const userOrderv2 =async(userid)=>{
   const row = await db.query(`SELECT pesanan.* ,product.harga,product.gambar,product.tech,product.product,product.link FROM pesanan INNER JOIN product ON pesanan.idproduk = product.id WHERE pesanan.user = ?`, [userid])
   return row
}
const getOrder =async(userid)=>{
   const [row] = await db.query(`SELECT pesanan.* ,product.harga,product.gambar,product.tech,product.product,product.link FROM pesanan INNER JOIN product ON pesanan.idproduk = product.id WHERE pesanan.id = ?`, [userid])
   console.log(row)
   return row
}

const selectbyid =async(id)=>{
    const row = await db.query(`SELECT * FROM pesanan WHERE id = ?`,[id])
    return row
}
module.exports = {
    updateOrder,
    userOrder,
    insertOrder,
    orderOwner,
    userOrderv2,
    getOrder,
    selectbyid

}
