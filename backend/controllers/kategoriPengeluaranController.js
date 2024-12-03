const { messaging } = require('firebase-admin');
const db = require('../models/db');

exports.getKategoriPengeluaran = async (req, res) => {
    try {
        const query = 'SELECT * FROM kategori_pengeluaran';
        db.query(query, (error, results) => {
            if (Error) {
                return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
            }
            res.status(200).json({ message: 'Kategori pengeluaran berhasi diambil.', data:results });
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};