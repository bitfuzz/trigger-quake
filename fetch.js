import axios from 'axios';
// import {Client} from 'pg';
import pool from './db.js'

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

pool.connect().then(()=> console.log("Connection Successfully!"))


const query = `INSERT INTO earthquakes(magnitude, place, id, "time", "long", "lat", depth, title, type, felt) 
                VALUES ($1, $2, $3, to_timestamp($4), $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id) DO NOTHING;`


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
    for(let i =0; i<=data.features.length-1;i++){
    
    const features = data.features[i]
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
        
        await pool.query(query, values);
        // console.log("Inserted values for id: ", features.id);
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
    setInterval(FailSafe, 1000*60*60*4);



}



// const dat1a = await getQuakes(dayurl);
// console.log(dat1a.features.);
