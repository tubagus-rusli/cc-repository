const db = require('./db');

const getSaldoByUserId = async (userId) => {
    try {
        const query = 'SELECTED saldo FROM users WHERE user_id = $1';
        const result = await db.query(query, [userId]);

        return result.rows[0]?.saldo || 0;
    } catch (err) {
        throw err;
    }
};

module.exports = { getSaldoByUserId };