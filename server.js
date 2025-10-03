import {startPollingServices} from "./fetch.js";
import express from 'express';
import pool from './db.js'
import cors from 'cors';

const PORT = 8080;

const app = express();
app.use(cors());

//how to get data from pg
app.get('/api/recent', async (req, res)=>{


    try {
        const result = await pool.query('SELECT * FROM earthquakes ORDER BY "time" DESC LIMIT 20');
        res.json(result.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');        
    }
    

})

startPollingServices();
//start the api
app.listen(PORT, ()=>{console.log("Server is running on port 8080");});
