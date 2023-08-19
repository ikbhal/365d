// routes/hours.js
const express = require('express');
const router = express.Router();

const daysData = require('../data/365d.json');

// Get Hours of Day
router.get('/user/:username/day/:dayId/hours', (req, res) => {
    const username = req.params.username;
    const dayId = parseInt(req.params.dayId);

    // const username = req.params.username;
    const userFilePath = path.join(__dirname, '..', 'data', username, '365d.json');

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

        const selectedDay = userData.find(day => day.dayId === dayId);

        if (!selectedDay) {
            return res.status(404).json({ error: 'Day not found' });
        }

        // check hours key exist in userData json object, if exist, retrieve it else give []

        res.json(selectedDay.hours);
    } catch (error) {
        res.status(500).json({ error: 'Error reading user data' });
    }
});

// Update Hour of Day
router.put('/user/:username/day/:dayId/hours/:hourId', (req, res) => {
    const username = req.params.username;
    const dayId = parseInt(req.params.dayId);
    const hourId = parseInt(req.params.hourId);
    const updatedHourData = req.body; // Assume it contains checked and notes

    // const username = req.params.username;
    const userFilePath = path.join(__dirname, '..', 'data', username, '365d.json');

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        // check hours key exist in userData json object, if exist, retrieve it else give []

        // Find the day with the specified dayId
        const selectedDay = userData.find(day => day.dayId === dayId);

        if (!selectedDay) {
            return res.status(404).json({ error: 'Day not found' });
        }

        // Find the hour within the selected day
        const selectedHour = selectedDay.hours.find(hour => hour.hourId === hourId);

        if (!selectedHour) {
            return res.status(404).json({ error: 'Hour not found' });
        }

        // Update the hour's checked and notes fields
        selectedHour.checked = updatedHourData.checked;
        selectedHour.notes = updatedHourData.notes;

        // Simulate saving the updated data back to the storage (e.g., daysData)
        // You would typically save the data back to the actual storage (e.g., 365d.json)
        // For now, just returning the updated hour data
        res.json(selectedHour);
    } catch (error) {
        res.status(500).json({ error: 'Error reading user data' });
    }


});
module.exports = router;
