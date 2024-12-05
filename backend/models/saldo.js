const db = require('./db');

const getSaldoByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT nominal AS saldo
            FROM saldo
            WHERE user_id = $1
            ORDER BY tanggal DESC
            LIMIT 1
        `;

        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]?.saldo || 0); // Jika tidak ada saldo, kembalikan 0
            }
        });
    });
};


const updateSaldo = (userId, saldo) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET nominal = $1 WHERE id = $2';
        
        db.query(query, [saldo, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { getSaldoByUserId, updateSaldo };
