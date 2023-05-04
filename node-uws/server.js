'use strict';

const port = 3055;
const uWS = require('uWebSockets.js');

/**
 * This class contains the custom logic for the
 * websocket server.
 */
class Server {

  /**
   * Creates the websocket server object with the necessary event handlers,
   * and starts listening on the given port
   * @returns void
   */
  start() {

    /**
     * Initialize the websocket server object
     * @type {TemplatedApp}
     */
    const app = uWS.App().ws('/*', {

      // Websocket server options
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 10,
      maxBackpressure: 1024,

      /**
       * Event triggered whenever a client connects to the websocket
       * @param ws {WebSocket} The newly connected client
       */
      open: (ws) => {
        ws.send("Hello!");
      },

      /**
       * Event triggered whenever the server receives an incoming message from a client
       * @param ws {WebSocket} The client the incoming message is from
       * @param message The incoming message
       * @param isBinary {boolean} Whether the message was sent in binary mode
       */
      message: (ws, message, isBinary) => {
        ws.send(message);
      }

      /**
       * Tells the websocket server to start listening for incoming connections
       * on the given port
       */
    }).listen(port, (token) => {
      if (token) {
        console.log('Listening to port ' + port);
      } else {
        console.log('Failed to listen to port ' + port);
      }
    });
  }
}


// Create an instance of the websocket server and start it
let server = new Server();
server.start();