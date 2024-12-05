const db = require('../models/db');

exports.getKategoriPengeluaran = async (req, res) => {
    try {
        const query = 'SELECT * FROM kategori_pengeluaran';
        const result = await db.query(query);
        res.status(200).json({ message: 'Kategori pengeluarna berhasil diambil.', data: result.rows});
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};