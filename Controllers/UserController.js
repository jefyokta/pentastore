const express = require('express');
const userc = express.Router();
const { Login , Register , Find } = require('../Models/userModel')
userc.use(express.json());



userc.post('/login',async (req,res)=> {
    try {
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
   
       
        res.status(200).json(result)
          
    
         
    } catch (error) {
        res.status(500).json('gagal')
        throw error
        
    }
})

userc.post('/register', (req,res)=>{
    try {
        const data =  req.body

    } catch (e) {
        throw e
    }
})

userc.get('/', async (req,res)=>{

    const username = req.query.u

    if (!username) {
        res.status(400).send(' u params diperlukan')
    }

    try {
        const result = await Find(username)
        if (result.status === 404) {

            res.status(404).json('not found')
        }
        res.status(200).json(result)
     
    } catch (error) {
        res.status(500)
    }
})

module.exports = userc