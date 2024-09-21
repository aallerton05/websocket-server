const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    console.log('Received audio data:', data);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on port ${PORT}`);
