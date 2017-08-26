const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const User = require('../models/User').User;
const getUserInfo = require('../utils/helpers.js').getUserInfo;


// Generate JWT
const generateJwt = (user) => {
    return jwt.sign(user, config.get('auth.secret'), {
        expiresIn: 604800,
    });
};

/**
 * Login Route
 * @param {object} req
 * @param {object} res
 * @param {callback} next
 */
exports.login = (req, res, next) => {
    const userInfo = getUserInfo(req.user);
    res.set('Authorization', `JWT ${generateJwt(userInfo)}`);
    res.status(200).json({
        user: userInfo,
    });
};


/**
 * Registration Route
 */

exports.register = (req, res, next) => {
    const {email, firstName, lastName, password} = req.body;

    // TODO: Add fields validation 

    User.findOne({
        email,
    }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        const user = new User({
            email,
            password,
            profile: {
                firstName,
                lastName,
            },
        });


        user.save((err, user) => {
            if (err) {
                return next(err);
            }
            res.set('Authorization', `JWT ${generateJwt(user)}`);
            res.status(201).end();
        });
    });
};
