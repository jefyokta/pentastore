const mysql =  require('mysql2')
require ('dotenv').config()
class Database{
    constructor (konfigurasi){
        this.pool =  mysql.createPool(konfigurasi).promise()
    }

    async query(sql, values){
        try {
            
            const [rows, field ] = await this.pool.query(sql, values);
            return rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectAll(tbname, limit = 5) {
        try {
            let limit1;

            if (limit === null) {
                limit1 = 5
            }
            else{
                limit1 = limit;
            }
        
          const queryResult = await this.query(`SELECT * FROM ${tbname} LIMIT ${limit1}`);
          return queryResult;
        } catch (error) {
          console.error("Error in selectAll method:", error);
          throw error;
        }
      }

      async selectByid(tb,id){
        const query = await this.query(`SELECT * FROM ${tb} WHERE id = ?`,[id])
        return query
      }
      





    async close() {
       await this.pool.end();
    }
}
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB;
const dbPort = process.env.DB_PORT;

const config = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
};
const db =  new Database(config);
module.exports = db;