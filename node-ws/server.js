'use strict';

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3044 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    ws.send(data);
  });

  ws.send('connected');
});

console.log('Listening on port 3044');