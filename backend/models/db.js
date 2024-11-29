const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi ke Database gagal: ', err.message);
    } else {
        console.log('Terhubung ke database MySQL');
    }
});

module.exports = db;