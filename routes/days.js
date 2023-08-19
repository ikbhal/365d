// routes/days.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/:username/days', (req, res) => {
    const username = req.params.username;
    const userFilePath = path.join(__dirname, '..', 'data', username, '365d.json');

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Error reading user data' });
    }
});


// Update day's data
router.put('/:username/:dayId', (req, res) => {
    const username = req.params.username;
    const dayId = parseInt(req.params.dayId);
    const userFilePath = path.join(__dirname, '..', 'data', username, '365d.json');

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        const updatedData = userData.map(day => {
            if (day.dayId === dayId) {
                day.checked = req.body.checked || day.checked;
                day.notes = req.body.notes || day.notes;
            }
            return day;
        });

        fs.writeFileSync(userFilePath, JSON.stringify(updatedData, null, 2));
        res.json({ message: 'Day data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating day data' });
    }
});
module.exports = router;
