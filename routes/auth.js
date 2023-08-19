// auth.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const usersFilePath = getUserFilePath();
    try {
        const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        if (usersData.find(user => user.username === username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Add user to users.json
        usersData.push({ username, password });
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

        // Create user data folder and default 365d.json
        const userDataFolderPath = path.join(__dirname, '..', 'data', username);
        const userFilePath = path.join(userDataFolderPath, '365d.json');
        fs.mkdirSync(userDataFolderPath, { recursive: true });
        const initialUserData = Array.from({ length: 365 }, (_, i) => ({
            // dayId: i + 1,
            dayId: 365-i,
            checked: false,
            notes: ''
        }));
        fs.writeFileSync(userFilePath, JSON.stringify(initialUserData, null, 2));

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});


function getUserFilePath() {
    const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
    return usersFilePath;
}

// Login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const usersFilePath = getUserFilePath();
    try {
        const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const user = usersData.find(u => u.username === username && u.password === password);
        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
