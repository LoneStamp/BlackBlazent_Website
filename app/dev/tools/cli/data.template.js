const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/app/database/services/bot/chat.bot.data.md', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'database', 'services', 'bot', 'chat.bot.data.md');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading bot data file');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
