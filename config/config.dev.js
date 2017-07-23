const config = {};


config.ip = '127.0.0.1';
config.port = 8080;
config.env = 'dev';

config.auth = {};
config.auth.secret = 'sycsecret';
config.db = {};
config.db.url = 'mongodb://localhost:27017';


module.exports = config;
