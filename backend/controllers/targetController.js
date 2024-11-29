const db = require('../models/db');

exports.getTarget = async (req, res) => {
    const { userId } = req.params;

    try {
        const query = 'SELECT * FROM target WHERE userId = ? ORDER BY tanggal DESC LIMIT 1';
        const [result] = await db.promise().query(query, [userId]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Target tidak ditemukan' });
        }

        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan', error: error.message});
    }
};

exports.updateTarget = async (req, res) => {
    const { userId, nominal, tanggal } = req.body;

    if (!userId || !nominal || !tanggal) {
        return res.status(400).json({ message: 'semua field wajib diisi' });
    }

    try {
        const checkQuery = 'SELECT * FROM target WHERE userId = ? ORDER BY tanggal DESC LIMIT 1';
        const [result] = await db.promise().query(checkQuery, [userId]);

        if (result.length > 0) {
            const updateQuery = 'UPDATE target SET nominal = ?, tanggal = ? WHERE userId = ?';
            await db.promise().query(updateQuery, [nominal, tanggal, userId]);
            return res.status(200).json({ message: 'Target berhasil diperbarui' });
        } else {
            const insertQuery = 'INSERT INTO target (userId, nominal, tanggal) values (?, ?, ?)';
            const [newResult] = await db.promise().query(insertQuery, [userId, nominal, tanggal]);
            return res.status(201).json({ message: 'Target berhasil ditambahkan', id: newResult.insertId });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi keasalahan', error: error.message });
    }
};