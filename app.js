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

app.use('/api/auth', authRoutes);
app.use('/api/days', daysRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
