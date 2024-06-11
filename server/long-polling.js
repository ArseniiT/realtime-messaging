const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const eventEmitter = new events.EventEmitter();

const app = express();

app.use(cors());

app.get('/lp/get-message', (req, res) => {
    emmiter.once('message', (message) => {
        res.status(200).send(message);
    });
});

app.post('/lp/send-message', (req, res) => {
    const msgFromBody = req.body.message;

    emmiter.emit('message', msgFromBody);

    res.status(200).send('Message sent');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
