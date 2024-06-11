const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const eventEmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/lp/get-messages', (req, res) => {
    eventEmitter.once('message', (message) => {
        res.json(message);
    });
});

app.post('/lp/send-message', (req, res) => {
    const msgFromBody = req.body;

    eventEmitter.emit('message', msgFromBody);

    res.status(200).send('Message sent');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
