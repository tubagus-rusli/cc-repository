require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-config.json');

const authRoutes = require('./routes/authRoutes');
const saldoRoutes = require('./routes/saldoRoutes');
const targetRoutes = require('./routes/targetRoutes');
const pendapatanRoutes = require('./routes/pendapatanRoutes');
const pengeluaranRoutes = require('./routes/pengeluaranRoutes');
const kategoriRoutes = require('./routes/kategoriRoutes');
const rekomendasiRoutes = require('./routes/rekomendasiRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/saldo', saldoRoutes);
app.use('/api/target', targetRoutes);
app.use('/api/pendapatan', pendapatanRoutes);
app.use('/api/pengeluaran', pengeluaranRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/rekomendasi', rekomendasiRoutes);
app.use('/api/home', homeRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server berjalan di ${PORT}`);
});
