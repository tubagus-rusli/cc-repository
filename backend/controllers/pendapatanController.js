const db = require('../models/db');

exports.addPendapatan = async (req, res) => {
    const { userId, nominal, kategori_id, tanggal } = req.body;
    try {
        const query = 'INSERT INTO pendapatan (user_id, nominal, kategori_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query, [userId, nominal, kategori_id, tanggal]);
        res.status(201).json({ message: 'Pendapatan berhasil ditambahkan', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.getPendapatan = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT p.id, p.nominal, p.tanggal, k.nama AS kategori
            FROM pendapatan p
            JOIN kategori_pendapatan k ON p.kategori_id = k.id
            WHERE p.user_id = $1
        `;
        const result = await db.query(query, [userId]);
        res.status(200).json({ message: 'Daftar pendapatan berhasil diambil', data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.deletePendapatan = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM pendapatan WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Pendapatan tidak ditemukan' });
        }
        res.status(200).json({ message: 'Pendapatan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};
