// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3042; // Change the port number to 3042

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Routes and API endpoints will be added here
// Import auth routes
const authRoutes = require('./routes/auth');
const daysRoutes = require('./routes/days');
const hoursRouter = require('./routes/hours'); 

app.use('/api/auth', authRoutes);
app.use('/api/days', daysRoutes);
app.use('/api', hoursRouter);

// Route for viewing day hours
app.get('/api/user/:username/day/:dayId/hours', (req, res) => {
    const user = req.params.username;
    const dayId = req.params.dayId;
    // Render the day_view.ejs template and pass the dayId
    res.render('day_view.ejs', { username, dayId });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
