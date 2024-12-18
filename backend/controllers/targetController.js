const db = require('../models/db');

exports.getTarget = async (req, res) => {
    const { userId } = req.params;

    try {
        const query = 'SELECT * FROM target WHERE userId = $1 ORDER BY tanggal DESC LIMIT 1';
        const result = await db.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Target tidak ditemukan' });
        }

        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan', error: error.message});
    }
};

exports.updateTarget = async (req, res) => {
    const { userId, nominal, tanggal } = req.body;

    if (!userId || !nominal || !Date.parse(tanggal)) {
        return res.status(400).json({ message: 'semua field wajib diisi' });
    }

    try {
        const checkQuery = 'SELECT * FROM target WHERE userId = $1 ORDER BY tanggal DESC LIMIT 1';
        const result = await db.query(checkQuery, [userId]);

        if (result.rows.length > 0) {
            const updateQuery = 'UPDATE target SET nominal = $1, tanggal = $2 WHERE userId = $3';
            await db.query(updateQuery, [nominal, tanggal, userId]);
            return res.status(200).json({ message: 'Target berhasil diperbarui' });
        } else {
            const insertQuery = 'INSERT INTO target (userId, nominal, tanggal) values ($1, $2, $3) RETURNING id';
            const newResult = await db.query(insertQuery, [userId, nominal, tanggal]);
            return res.status(201).json({ message: 'Target berhasil ditambahkan', id: newResult.rows[0].id });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi keasalahan', error: error.message });
    }
};