const passport = require('passport'),
    User = require('../models/User').User,
    config = require('./config'),
    passportJwt = require('passport-jwt'),
    JwtStrategy = passportJwt.Strategy,
    ExtractJwt = passportJwt.ExtractJwt,
    LocalStrategy = require('passport-local');


// Setting username field to email and passwordField to password.
const localOptions = {
    usernameField: 'email',
};


// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({
        email,
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Your login details could not be verified, Please try again.',
            });
        }
        console.log(`${email}:${password}`);
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, {
                    message: 'Your login details could not be found. Please try again',
                });
            }
            return done(null, user);
        });
    });
});


// Setting JWT startegy options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.get('auth.secret'),
    session: false,
};


// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log(payload);
    User.findOne(payload._id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
