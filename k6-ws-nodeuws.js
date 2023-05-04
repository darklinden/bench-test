import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
    vus: 1000,
    duration: "60s",
};

export default function () {
    // public websocket server for quick test
    const url = 'ws://localhost:3055';

    var response = ws.connect(url, null, function (socket) {
        socket.on('open', function open() {
            // console.log('connected');
            socket.ping();

            socket.setInterval(function timeout() {
                socket.ping();
                // console.log("Pinging every 200ms (setInterval test)");
            }, 200);
        });

        socket.on('ping', function () {
            // console.log("PING!");
        });

        socket.on('pong', function () {
            // console.log("PONG!");
        });

        socket.on('pong', function () {
            // Multiple event handlers on the same event
            // console.log("OTHER PONG!");
        });

        socket.on('message', function (message) {
            // console.log(`Received message: ${message}`);
        });

        socket.on('close', function () {
            // console.log('disconnected');
        });

        socket.on('error', function (e) {
            if (e.error() != "websocket: close sent") {
                console.log('An unexpected error occured: ', e.error());
            }
        });

        socket.setTimeout(function () {
            // console.log('2 seconds passed, closing the socket');
            socket.close();
        }, 5000);
    });

    check(response, { "status is 101": (r) => r && r.status === 101 });
}