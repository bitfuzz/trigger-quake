import axios from 'axios';
import { checkAndNotify } from './notificationService.js';
import pool from '../config/db.js'

// connect the pg database
pool.connect().then(()=> console.log("Connection Successfully!"))


const query = `INSERT INTO earthquakes(magnitude, place, id, "time", "long", "lat", depth, title, type, felt) 
                VALUES ($1, $2, $3, to_timestamp($4), $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id) DO NOTHING
                RETURNING *;` //because INSERT statemnet doesn't return by default 

//dayurl is single dau, and url is hourly
const dayurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"; 

//get request to get live feed
async function getQuakes(url)
{
    try{
        const response = await axios.get(url);
        return response.data; // returns a promise (NOT A VALUE)
    }
    catch(error){
        console.error(`Error: ${error}`); 
    }
}



async function InsertQuakes(data){
    if (!data || !data.features) {
        console.log("Warning: No earthquake data received. Skipping insertion.");
        return; 
    }
    for(let i =0; i<=data.features.length-1;i++){
    
    const features = data.features[i]
    if (features.properties.mag===null || features.properties.mag==='?'){
        continue;

    }
    const values = [
        features.properties.mag,
        features.properties.place,
        features.id,
        features.properties.time/1000,
        features.geometry.coordinates[0],
        features.geometry.coordinates[1],
        features.geometry.coordinates[2],
        features.properties.title,
        features.properties.type,
        features.properties.felt
        ]
// --TODO Add felt, type of siesmic acitivity, title columns


    try {
        
        const result = await pool.query(query, values);

        if(result.rows.length>0){
            console.log("Inserted values for id: ", features.id);
            console.log(result.rows)
            console.log(`New quake at ${features.properties.place}`);  //properties.place
            checkAndNotify(features);
        }
    } catch (error) {
        pool.end();
        console.error("Error Occured:", error);
        
    }
    // console.log('='.repeat(40));
}
}

async function RecentQuakes(){

    const data = await getQuakes(url);
    await InsertQuakes(data);
}

async function FailSafe(dayurl){
    const daydata  = await getQuakes(dayurl);
    await InsertQuakes(daydata);

}



export function startPollingServices()
{
    console.log("Starting background services...");


    RecentQuakes();
    FailSafe(dayurl);
    setInterval(RecentQuakes, 1000*60*5);
    setInterval(FailSafe, 1000*60*60*4, dayurl);
    // setInterval(checkAndNotify, 1000*60*5, );



}



// const dat1a = await getQuakes(dayurl);
// console.log(dat1a.features.);


/* 
SCHEMA
mag
lat
long
depth
place(string)
time(timestamp)
id(primary key)
*/