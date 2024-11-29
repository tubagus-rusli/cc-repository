const saldoModel = require('../models/saldo');

exports.getSaldo = async (req, res) => {
    const userId = req.userId;
    try {
        const saldo = await saldoModel.getSaldoByUserId(userId);
        res.status(200).json({ saldo });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil saldo.', error: error.message});
    }
};

exports.updateSaldo = async (req, res) => {
    const userId = req.userId;
    const { saldo } = req.body;

    if (saldo === undefined) {
        return res.status(400).json ({ message: 'saldo tidak boleh negatif.' });
    }

    try {
        if (saldo < 0) {
            return res.status(400).json({ message: 'saldo harus diisi.' });
        }

        const result = await saldoModel.updateSaldo(userId, saldo);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'user tidak ditemukan atau saldo gagal diperbarui.'});
        }
        
        res.status(200).json({ message: 'saldo berhasil diperbarui.'});
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memerbarui saldo.', error: error.message});
    }    
};