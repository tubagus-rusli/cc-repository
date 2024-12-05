const db = require('../models/db');

exports.getHomeData = async (req, res) => {
    const { userId } = req.params;

    try{
        const saldoResult = await db.query(
            "SELECT nominal, tanggal FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1",
            [userId]
        );

        const targetResult = await db.query(
            "SELECT nominal, tanggal FROM target WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1",
            [userId]
        );

        const pendapatanResult = await db.query(
            `SELECT p.nominal, k.nama AS kategori, p.tanggal FROM pendapatan p JOIN kategori_pendapatan k ON p.kategori_id = k.id WHERE p.user_id = $1 ORDER BY p.tanggal DESC LIMIT 5`,
            [userId]
        );

        const pengeluaranResult = await db.query(
            `SELECT p.nominal, k.nama AS kategori, p.tanggal FROM pengeluaran p JOIN kategori_pengeluaran k ON p.kategori_id = k.id WHERE p.user_id = $1 ORDER BY p.tanggal DESC LIMIT 5`,
            [userId]
        );

        const rekomendasiResult = await db.query(
            "SELECT nominal FROM rekomendasi WHERE user_id = $1 ORDER BY id DESC LIMIT 1",
            [userId]
        );

        const homeData = {
            saldo: saldoResult.rows[0] || {nominal: 0, tanggal: null},
            target: targetResult.rows[0] || {nominal: 0, tanggal: null},
            pendapatan: pendapatanResult.rows || [],
            pengeluaran: pengeluaranResult.rows || [],
            rekomendasi: rekomendasiResult.rows[0]?.nominal || null,
        };

        res.status(200).json(homeData);
    } catch (error) {
        console.error("Error fetching home data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};