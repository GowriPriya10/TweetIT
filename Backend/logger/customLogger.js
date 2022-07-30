const Transport = require('winston-transport');
const run  = require('../kafka/producer');

module.exports = class customTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    run(info[Symbol.for("message")], 'tweet-api-logger');
    callback();
  }
};