const convict = require('convict');



// Define a schema
const config = convict({

    env: {
        doc: "The application envirenement",
        format: ["prod", "dev", "debug"],
        default: "dev",
        env: "NODE_ENV"
    },
    ip: {
        doc: "The ip adress to bind",
        "format": "ipaddress",
        default: "127.0.0.1",
        "env": "IP_ADRESSS"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8080,
        env: "PORT"
    },
    auth: {
        secret: {
            doc: "The secret used by bycrypt to encrypt password",
            format: "*",
            default: "",
            sensitive: true
        }
    },
    db: {
        url: {
            doc: "The url of the mongodb db",
            format: String,
            default: "mongodb://localhost:27017"
        }
    }
});

// Load envirenment dependent configuration
const env = config.get('env');
config.load(require('./config.' + env));

// Perform validation
config.validate({
    allowed: 'strict'
});

module.exports = config;