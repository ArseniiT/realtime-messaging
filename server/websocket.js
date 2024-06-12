const ws = require('ws');

const PORT = 5000;

const wsServer = new ws.Server({ port: PORT }, () => {
    console.log(`Server is running on port ${PORT}`);
});

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {

        message = JSON.parse(message);

        switch (message.type) {
            case 'message':
                sendMessage(message)
                break;
            case 'connection':
                sendMessage(message);
                break;
            case 'disconnection':
                message = JSON.stringify({
                    type: 'disconnection',
                    data: message.data
                });
                sendMessage(message);
                break;
        }
    });
});

const sendMessage = (message) => {
    wsServer.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
};