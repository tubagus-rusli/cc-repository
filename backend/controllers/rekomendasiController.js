const db = require('../models/db');

const getRekomendasi = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM rekomendasi WHERE user_id = $1 ORDER BY id DESC LIMIT 1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Rekomendasi tidak ditemukan.' });
        }
        
        res.status(200).json({ rekomendasi: result.rows[0] });
    } catch (error) {
        console.error('Error saat mengambil rekomendasi:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

const addRekomendasi = async (req, res) => {
    const { userId, nominal } = req.body;

    if (!userId || !nominal) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }
    
    try {
        await db.query(
            'INSERT INTO rekomendasi (nominal, user_id) VALUES ($1, $2)',
            [nominal, userId]
        );

        res.status(201).json({ message: "Rekomendasi berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

module.exports = { getRekomendasi, addRekomendasi };
