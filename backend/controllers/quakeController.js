import pool from '../config/db.js'


export const getRecentQuakes = async(req, res)=>{
    // console.log("1. Request received in Controller");
    try {
        // console.log("2. Attempting DB query");
        const result = await pool.query('SELECT * FROM earthquakes ORDER BY "time" DESC LIMIT 20');
        // console.log("3. Query Successful");
        res.json(result.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');        
    }
};

