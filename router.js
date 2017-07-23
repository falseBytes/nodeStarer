const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passport = require('passport');
const passportService = require('./config/passport');


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


    /**
     * Auth Routes
     */
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);


    authRoutes.post('/login', requireLogin, AuthenticationController.login);


    // Set the base url of the api
    app.use('/api', apiRoutes);
};
