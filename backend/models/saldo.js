const db = require('./db');

const getSaldoByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT saldo FROM users WHERE user_id = $1';
        
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]?.saldo || 0);
            }
        });
    });
};

module.exports = { getSaldoByUserId };
