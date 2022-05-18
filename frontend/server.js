const http = require('http');
const express = require('express');
const SSE = require('sse');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 4000;

app.use(express.static('build'));
const server = http.createServer(app);

let total = 0;
let page = 0;
const clients = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/admin', function(request, response, next) {
    response.sendFile(__dirname + '/build/index.html');
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

app.post('/page', (req,res) => {
  page = req.body.page;
  res.status(200);
  res.end();
});

app.delete('/reset', (req, res) => {
    total = 0;
    res.status(204);
    res.end();
});

server.listen(port, () => {
    const sse = new SSE(server);
    console.log(`Tropi Server listening on port ${port}!`);

    sse.on('connection', function(stream) {
        clients.push(stream);
        console.log('Opened connection 🎉');

        var json = JSON.stringify({ total: total, page: page });
        stream.send(json);
        console.log('Sent: ' + json);

        stream.on('close', function() {
            clients.splice(clients.indexOf(stream), 1);
            console.log('Closed connection 😱');
        });
    });
});

// brodcast
const broadcast = () => {
    var json = JSON.stringify({ total: total, page: page });

    clients.forEach(function(stream) {
        stream.send(json);
        console.log('Sent: ' + json);
    });
}
setInterval(broadcast, 800);

app.post('/api', function(req, res) {
    var message = JSON.stringify(req.body);
    //console.log('Received: ' + message);
    res.status(200).end();

    var json = JSON.stringify({ total: total });
    clients.forEach((stream) => {
        stream.send(json);
        // console.log('Sent: ' + json);
    });
})
