const db = require('../models/db');

exports.addPengeluaran = async (req, res) => {
    const { userId, nominal, kategori_id, tanggal } = req.body;
    try {
        const query = 'INSERT INTO pengeluaran (user_id, nominal, kategori_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query, [userId, nominal, kategori_id, tanggal]);
        res.status(201).json({ message: 'Pengeluaran berhasil ditambahkan', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.getPengeluaran = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT p.id, p.nominal, p.tanggal, k.nama AS kategori
            FROM pengeluaran p
            JOIN kategori_pengeluaran k ON p.kategori_id = k.id
            WHERE p.user_id = $1
        `;
        const result = await db.query(query, [userId]);
        res.status(200).json({ message: 'Daftar pengeluaran berhasil diambil', data: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.deletePengeluaran = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM pengeluaran WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Pengeluaran tidak ditemukan' });
        }
        res.status(200).json({ message: 'Pengeluaran berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};
