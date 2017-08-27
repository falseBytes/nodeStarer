/**
 * Created by hatim on 12/07/17.
 */
const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./utils/logger');
const router = require('./router');
const config = require('./config/config');

/**
 * Configuration
 */
const appPort = config.get('port');
const appAddr = config.get('ip');

// Database Connection
// TODO: Add connection options
mongoose.connect(config.get('db.url')).then(
    () => {
        logger.info('Successfully connected to the mongodb instance');
    },
    (err) => {
        logger.err('Unable to connect to the the mongodb instance');
    }
);


/**
 * Middleware 
 */
app.use(morgan('combined', ({
    stream: logger.stream,
}))); // combined : Standard Apache combined log output.
app.use(bodyParser.urlencoded({
    extended: true,
})); // Parses url encoded bodies
app.use(bodyParser.json()); // Send JSON reponses

app.use(passport.initialize());

/**
 * Routing
 */

router(app);

/**
 * Run the app
 */

app.listen(appPort, () => {
    logger.info('Starting server on port : ' + appPort);
});
