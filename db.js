import pg from 'pg';

const pool = new pg.Pool({
    user:'postgres',
    password:'1320',
    port:1337,
    database:'quake'
});

export default pool;

//D:\Projects\Quake\db.js