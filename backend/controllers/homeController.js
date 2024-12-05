const { messaging } = require('firebase-admin');
const db = require('../models/db');

exports.getHomeData = async (req, res) => {
    const { userId } = req.params;

    try {
        // Query saldo
        const [saldo] = await db.query(
            "SELECT nominal, tanggal FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1",
            [userId]
        );

        // Query target
        const [target] = await db.query(
            "SELECT nominal, tanggal FROM target WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1",
            [userId]
        );

        // Query pendapatan
        const pendapatan = await db.query(
            `SELECT p.nominal, k.nama AS kategori, p.tanggal
             FROM pendapatan p
             JOIN kategori_pendapatan k ON p.kategori_id = k.id
             WHERE p.user_id = $1
             ORDER BY p.tanggal DESC LIMIT 5`,
            [userId]
        );

        // Query pengeluaran
        const pengeluaran = await db.query(
            `SELECT p.nominal, k.nama AS kategori, p.tanggal
             FROM pengeluaran p
             JOIN kategori_pengeluaran k ON p.kategori_id = k.id
             WHERE p.user_id = $1
             ORDER BY p.tanggal DESC LIMIT 5`,
            [userId]
        );

        // Query rekomendasi
        const [rekomendasi] = await db.query(
            "SELECT nominal FROM rekomendasi WHERE user_id = $1 ORDER BY id DESC LIMIT 1",
            [userId]
        );

        const homeData = {
            saldo: saldo[0] || null,
            target: target[0] || null,
            pendapatan: pendapatan.rows || [],
            pengeluaran: pengeluaran.rows || [],
            rekomendasi: rekomendasi?.nominal || null,
        };

        res.status(200).json(homeData);
    } catch (error) {
        console.error("Error fetching home data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
