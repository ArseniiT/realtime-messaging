const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const eventEmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/es/connect', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });

    eventEmitter.on('message', (msg) => {
        // special format for event-stream: data: {JSON}\n\n
        res.write(`data: ${JSON.stringify(msg)}\n\n`);
    });
});

app.post('/es/send-message', (req, res) => {
    const msgFromBody = req.body;

    eventEmitter.emit('message', msgFromBody);

    res.status(200).send('Message sent');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
