const http = require('http');
const express = require('express');
const SSE = require('sse');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 4000;

// const WebSocket = require('ws');
// var expressWs = require('express-ws')(app);

// const server = http.createServer(app);
app.use(express.static('build'));
const server = http.createServer(app);
/*
function (req, res) {
    // Set CORS headers
    console.log(req);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
}
*/
//initialize the WebSocket server instance
// const wss = new WebSocket.Server({server: server, path: "/"});

let total = 0;
const clients = [];

app.use(cors());
app.use(bodyParser.json());


// app.use(function (req, res, next) {
//     req.testing = 'testing';
//     return next();
//   });

// wss.on('connection', (ws) => {

//     //connection is up, let's add a simple simple event
//     ws.on('message', (message) => {

//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });

//     //send immediatly a feedback to the incoming connection    
//     ws.send('Hi there, I am a WebSocket server');
// });

app.get('/admin', function (request, response, next) {
    response.sendfile(__dirname + '/build/index.html');
});

app.get('/get-total', (req, res) => {
    res.send(`${total}`);
    res.status(200);
});

app.post('/add', (req, res) => {
    total = total + req.body.amount;
    res.status(200);
    res.end();
});

app.delete('/reset', (req, res) => {
    total = 0;
    res.status(204);
    res.end();
});

// app.ws('/', function (ws, req) {
//     ws.on('message', function (msg) {
//         //   console.log('*******************');
//         //   console.log(msg);
//         //   ws.send(total);
//         ws.res(total);
//     });
//     console.log('socket', req.testing);
// });

// app.listen(port, () => console.log(`Tropi Server listening on port ${port}!`));

server.listen(port, () => {
    const sse = new SSE(server);
    console.log(`Tropi Server listening on port ${port}!`);

    sse.on('connection', function (stream) {
        clients.push(stream);
        console.log('Opened connection 🎉');

        var json = JSON.stringify({ total: total });
        stream.send(json);
        console.log('Sent: ' + json);

        stream.on('close', function () {
            clients.splice(clients.indexOf(stream), 1);
            console.log('Closed connection 😱');
        });
    });
});

// brodcast
const broadcast = () => {
    var json = JSON.stringify({ total: total });

    clients.forEach(function (stream) {
        stream.send(json);
        console.log('Sent: ' + json);
    });
}
setInterval(broadcast, 800);

app.post('/api', function (req, res) {
    var message = JSON.stringify(req.body);
    //console.log('Received: ' + message);
    res.status(200).end();

    var json = JSON.stringify({ total: total });
    clients.forEach((stream) => {
        stream.send(json);
        // console.log('Sent: ' + json);
    });
})