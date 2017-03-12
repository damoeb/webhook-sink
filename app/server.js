const express = require('express');
const mongo = require('./mongo');
const app = express();

const server = app.listen(3000, function () {
    console.log('listening on 3000')
});

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/api/hooks', function (req, res) {

    mongo.client()
        .then((db) => {
            db.collection('hooks')
            res.send(200);
        })
        .catch(() => {
            res.send(200);
        });

    console.log(req.body);
});

// return all hooks
app.get('/api/hooks', function (req, res) {
    mongo.client()
        .then((db) => {
            db.collection('hooks')
            res.send(200);
        })
        .catch(() => {
            res.send(200);
        });
});

var gracefulShutdown = function () {
    console.log("Received kill signal, shutting down gracefully.");
    mongo.close();
    server.close(function () {
        console.log("Closed out remaining connections.");
        process.exit()
    });
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);