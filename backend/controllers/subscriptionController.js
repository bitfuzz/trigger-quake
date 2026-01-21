import pool from '../config/db.js'

const createSubscription  = async(req, res)=> {

    const {email, lat, lon, min_magnitude, radius_km} =  req.body
    try {
        if(!email || !lat || !lon || !radius_km){
            return res.status(400).json({error:'Fill all fields'});
        }

        const query = `
            INSERT INTO subscriptions (email, lat, lon, radius_km, min_magnitude, location)
            VALUES ($1, $2::decimal, $3::decimal, $4, $5, ST_SetSRID(ST_MakePoint($3::float, $2::float), 4326))
            RETURNING *;
        
        `
        const values = [email, lat, lon, radius_km, min_magnitude || 0];
        const newSubscription = await pool.query(query, values);
        res.status(201).json(newSubscription.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }


};

export {createSubscription};