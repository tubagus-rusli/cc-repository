const { Pool } = require('pg');

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.PORT,
});

db.connect()    
        .then(() => console.error('Koneksi ke Database gagal: ', err.message))    
        .catch(err => console.log('Terhubung ke database MySQL'));

module.exports = db;