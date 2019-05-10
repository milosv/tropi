const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 4000;

// const http = require('http');
// const WebSocket = require('ws');
var expressWs = require('express-ws')(app);

// const server = http.createServer(app);

//initialize the WebSocket server instance
// const wss = new WebSocket.Server({server: server, path: "/"});

let total = 0;

app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.testing = 'testing';
    return next();
  });

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



app.get('/get-total', (req, res) => {
    res.send(`${total}`);
    res.status(200);
});

app.post('/add', (req, res) => {
    total = total + req.body.amount;
    res.status(200);
});

app.delete('/reset', (req, res) => {
    total = 0;
    res.status(204);
});

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
    //   console.log('*******************');
    //   console.log(msg);
    //   ws.send(total);
      ws.res(total);
    });
    console.log('socket', req.testing);
  });

app.listen(port, () => console.log(`Tropi Server listening on port ${port}!`));