import pg from 'pg';
import dotenv from 'dotenv';

// const cred = "@db.khuyzsgiyqcrhheidhkj.supabase.co:5432/"
dotenv.config({path: './.env'})
console.log(process.env.DB_CREDS)


const pool = new pg.Pool({

 user: 'postgres',
    // Look at your Supabase URL: postgresql://postgres:[PASSWORD]@db.abcdefg.supabase.co:5432/postgres
    // The HOST is the part between '@' and ':'
    host: 'db.khuyzsgiyqcrhheidhkj.supabase.co', 
    database: 'postgres',
    password: 'POKEMONvs123!@#', // Put your literal password here (no %40 or encoding needed)
    port: 5432,
 ssl:{
    rejectUnauthorized:false
 }

    // user:'postgres',
    // password:'1320',
    // port:1337,
    // database:'quake'
});

export default pool;

//D:\Projects\Quake\db.js