const db = require('../models/db');

exports.getKategoriPendapatan = async (req, res) => {
    try {
        const query = 'SELECT * FROM kategori_pendapatan';
        const result = await db.query(query);
        
        res.status(200).json({
            message: 'Kategori pendapatan berhasil diambil.',
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan server.',
            error: error.message
        });
    }
};
