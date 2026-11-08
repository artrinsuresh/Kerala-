const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (data) => {
    // Broadcast incoming messages to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});
