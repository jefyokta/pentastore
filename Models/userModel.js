const db = require('../Database/Database')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const table = 'users';


const Register = async (user) =>{
    const { username, email , password} = user
    const [rows] = await db.query(
        `INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password]
      );

   
      return rows;

}
const Login = async (user) => {
    try {
        const username = user.username
        const email = user.email
        const password = user.password
        const [rows] = await db.query(
          `SELECT * FROM ${table} WHERE username = ? OR email = ? `,
          [username , email]
        );
        if (rows){
            if (password === rows.password) {

                const payload = {
                    id : rows.id,
                    username :  rows.username,
                    email : rows.email,
                    refreshtoken: rows.refreshtoken,
                    role : rows.role
                }
               
                const token = await  jwt.sign(payload, process.env.SECRET_KEY)
                const rtoken = token.split('.');

                const up = await db.query("UPDATE users SET refreshtoken = ? WHERE id = ?",[rtoken[1],rows.id])
                if (up) {
                    return token
                }
         
            
               
              
           
         
              
                
               
            }
            return  {
                status: 401,
                message: "pass w"

            };
        }
        return  {
            status: 404,
            message: "user not found"

        }


      
    } catch (error) {
        throw error
    
    }
   
  }

  const Find = async  (username)=>{
   const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE username = ?`,
        [username]
        )
    if (!rows) {
        return {
            status:404
        }
    }
    return {
        status : 200,
        body : {

            username: rows.username,
            email :rows.email,
            role : rows.role,
            image : rows.gambar,

        }
    }
  }





module.exports = {
    Register,
    Login,
    Find
}