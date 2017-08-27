const AuthenticationController = require('./controllers/authentication');
const userController = require('./controllers/user');
const express = require('express');
const passport = require('passport');
const passportService = require('./config/passport');
const logger = require('./utils/logger');


// Middleware to require login.auth

const requireAuth = passport.authenticate('jwt', {
    session: false,
});
const requireLogin = passport.authenticate('local', {
    session: false,
});

module.exports = (app) => {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const userRoutes = express.Router();

    /**
     * API Entry point
     */
    apiRoutes.get('/', (req, res, next) => {
        res.status(200).end('Node quick starter REST API works');
    });

    /**
     * User ressource routes
     */

     apiRoutes.use('/users', userRoutes);
     userRoutes.get('', userController.getAll);


    /**
     * Auth Routes
     */
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);


    // Set the base url of the api
    app.use('/api', apiRoutes);
};
