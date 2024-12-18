require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes'); //login & register
const saldoRoutes = require('./routes/saldoRoutes'); //saldo
const targetRoutes = require('./routes/targetRoutes'); //Target
const pendapatanRoutes = require('./routes/pendapatanRoutes'); //Pengeluaran
const pengeluaranRoutes = require('./routes/pengeluaranRoutes'); //Pendapatan
const kategoriRoutes = require('./routes/kategoriRoutes'); //kategori
const rekomendasiRoutes = require('./routes/rekomendasiRoutes'); //Rekomendasi
const homeRoutes = require('./routes/homeRoutes'); //dashboard(home)

const app = express();
const PORT = process.env.PORT || 8080;

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use('/api/auth', authRoutes); //login & register
app.use('/api/saldo', saldoRoutes); //saldo
app.use('/api/target', targetRoutes); //saldo
app.use('/api/pendapatan', pendapatanRoutes); //pendapatan
app.use('/api/pengeluaran', pengeluaranRoutes); //pengeluaran
app.use('/api', kategoriRoutes); //kategori
app.use('/api/rekomendasi', rekomendasiRoutes);
app.use('/api/home', homeRoutes);

//middleware (route tidak ditemukan & menangani error)
app.use((err, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di ${PORT}`);
});

