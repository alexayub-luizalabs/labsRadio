var config = {};
config.host = 'localhost';
config.port = 8080;
config.protocol = 'http'
config.address = config.protocol + '://' + config.host + ':' + config.port;

config.db = {
  host: '127.0.0.1',
  user: 'labsradio',
  password: 'labsradio',
  database: 'labsradio'
}

module.exports = config;
