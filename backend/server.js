require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use('/api/auth', authRoutes);

//middleware (route tidak ditemukan & menangani error)
app.use((err, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

