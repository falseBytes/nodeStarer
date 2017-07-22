/**
 * Created by hatim on 12/07/17.
 */
const express = require('express'),
    app = express(),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    logger = require('./util/logger'),
    config = require('./config/config');

/**
 * Configuration
 */

const appPort = config.get('port'),
    appAddr = config.get('ip');



/**
 * Middleware 
 */
app.use(morgan("combined", ({
    stream: logger.stream
}))); // combined : Standard Apache combined log output.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


/**
 * Routing
 */

app.use('/hello', (req, res) => {
    return res.status(200).send('Hello');
});


/**
 * Run the app
 */

app.listen(appPort, appAddr, () => {
    logger.info('Starting server on port : ' + appPort);
})