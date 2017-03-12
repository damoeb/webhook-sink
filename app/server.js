const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('./mongo');
const app = express();
app.use(bodyParser.json());

const server = app.listen(3000, function () {
  console.log('listening on 3000')
});

function respondJSON(res, err, json) {
  res.setHeader('Content-Type', 'application/json');
  if (err) {
    res.send(JSON.stringify(err));
  } else {
    res.send(json);
  }
}

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/api/hooks', function (req, res) {
  const recordsIn = req.body;
  mongo.client()
    .then((db) => {
      db.collection('hooks').insert(recordsIn, (err, records) => {
        respondJSON(res, err, records);
      });
    })
    .catch((err) => {
      respondJSON(res, err);
    });
});

// return all hooks
app.get('/api/hooks', function (req, res) {
  mongo.client()
    .then((db) => {
      db.collection('hooks').find().toArray().then((records) => {
        respondJSON(res, undefined, records);
      }).catch((err) => {
        respondJSON(res, err);
      });
    })
    .catch((err) => {
      respondJSON(res, err);
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
