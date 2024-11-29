const admin = require("firebase-admin");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }

    try {
        const user = await admin.auth().getUserByEmail(email);

        if (user) {
            const customToken = await admin.auth().createCustomToken(user.uid);
            return res.status(200).json({ message: "Login Successful", tokern: customToken});
        }
    } catch (error) {
        return res.status(400).json({ message: "login failed", error: error.message});
    }
};

   

exports.register = async (req, res) => {
    const { email, password, displayName } = req.body;

 
    if (!email || !password || !displayName) {
        return res.status(400).json({ error: 'email, password dan displayName wajib diisi.'});
    }

    try {
        const user = await admin.auth().createUser({
            email,
            password,
            displayName,
        });
        return res.status(201),json({ message: "User registered successfully", user});
    } catch (error) {
        return res.status(400).json({ message: "Registration failed", error: error.message});
    }
};