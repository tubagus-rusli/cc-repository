require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.DB_USER,
  host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 5,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi ke Database gagal: ', err.message);
    } else {
        console.log('Terhubung ke database MySQL');
    }
});

module.exports = db;