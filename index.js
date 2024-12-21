const express = require('express');
const bodyParser = require('body-parser');
const attendeeRoutes = require('./routes/attendees');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Routes
app.use('/api/attendees', attendeeRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
