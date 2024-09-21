const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Ping/pong mechanism to prevent idle timeouts
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('Sending ping to client');
      ws.ping();  // Send ping every 15 seconds to keep connection alive
    }
  }, 15000); // Ping every 15 seconds

  // Listen for pong responses from the client
  ws.on('pong', () => {
    console.log('Pong received from client');
  });

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);  // Echo the message back to the client
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(pingInterval);  // Stop pinging when client disconnects
  });
});

console.log(`WebSocket server running on port ${PORT}`);

