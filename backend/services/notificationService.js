import pool from '../config/db.js';
import { sendEmailAlert } from './emailService.js';

export const checkAndNotify = async (quake) => {
    const {properties, geometry} = quake;
    const magnitude = properties.mag; 
    const place =  properties.place;
    const quakeLat =  geometry.coordinates[0];
    const quakeLon =  geometry.coordinates[1];
    const time  = new Date(properties.time).toLocaleDateString();
    console.log(`Checking alerts for ${place}   (Mag:  ${magnitude}) `);

    try {
        
        const query = `
            SELECT email, radius_km, location 
            FROM subscriptions 
            WHERE min_magnitude <= $1 
            AND ST_DWithin(
                location, 
                ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, 
                radius_km * 1000 
            )
        `;
        
        const result = await pool.query(query, [magnitude, quakeLon, quakeLat]);


        if (result.rows.length > 0){
            console.log(`MATCH FOUND: ${result.rows.length} users affected.`);

            //imp 
            const emailPromises = result.rows.map(user => sendEmailAlert(user.email, {place, magnitude, time}))

            await Promise.all(emailPromises);
        }else{
            console.log("No subscriptions matched this quake.");
        }

    } catch (error) {
        console.log("Notification Error: ", error);
    }
}