const db = require('../Database/Database')


const Getproduct = async (setlimit = 50) => {
    try {
        const tbname = 'product'
        const res = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id
GROUP BY 
    product.id, product.product
 LIMIT ?`, [setlimit])
        return {
            status: 200,
            data: res
        }

    } catch (error) {
        return {
            status: 500
        }
    }

}
const GetproductCat = async (cat) => {
    try {
        const tbname = 'product'
        const res = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id
 WHERE tech LIKE ? OR product LIKE ? AND launched=1
GROUP BY 
    product.id, product.product`, [`%${cat}%`, `%${cat}%`])
        return res

    } catch (error) {
        return {
            status: 500
        }
    }
}
const PopularProduct = async () => {
    const response = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id
GROUP BY 
    product.id, product.product
ORDER BY ordered DESC
`, [])
    return response
}
const GetproductById = async (id) => {
    const [resp] = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id WHERE product.id = '${id}' GROUP BY product.id , product.product `, [id])
    return resp
}
const NewstProduct = async () => {
    try {
        const res = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id GROUP BY product.id, product.product ORDER BY id DESC`)
        return res
    } catch (error) {
        console.log(error);
    }
}
const getType = async (type) => {
    const rows = await db.query(`SELECT product.* , SUM(rate.value) / COUNT(*) AS star , (SELECT COUNT(*) FROM pesanan WHERE pesanan.idproduk = product.id AND status = 1) AS ordered FROM product LEFT JOIN rate ON rate.productid = product.id LEFT JOIN pesanan ON pesanan.idproduk =product.id WHERE type = ? GROUP BY product.id, product.product`, [type])
    return rows
}
const getcomment = async id => {

    try {
        const comments = await db.query(`SELECT rate.*  ,users.username , users.id AS userid,users.nama FROM rate INNER JOIN users ON users.id = rate.userid WHERE rate.productid = ?`, [id])
        if (comments.length < 1) {
            return 0

        }
        return comments

    } catch (error) {
        console.log(error)
        return false

    }


}

module.exports = {
    Getproduct,
    GetproductCat,
    PopularProduct,
    GetproductById,
    NewstProduct,
    getType,
    getcomment
}

