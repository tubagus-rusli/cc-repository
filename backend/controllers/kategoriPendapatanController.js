const db = require('../models/db');

exports.getKategoriPendapatan = async (req, res) => {
    try {
        const query = 'SELECT * FROM kategori_pendapatan';
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message});
            }
            res.status(200).json({ message: 'Kategori pendapatan berhasil diambil.', data: results });
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};