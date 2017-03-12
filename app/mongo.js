const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

module.exports = {
  close() {
    // TODO implement
  },
  client() {
    return new Promise((resolve, reject) => {
      MongoClient.connect('mongodb://localhost:27017/', {native_parser: true}, function (err, db) {
        if (_.isUndefined(err) || _.isNull(err)) {
          resolve(db);
        } else {
          reject(err);
        }

      });
    });
  }
};
