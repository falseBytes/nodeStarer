const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const User = require('../models/User').User;
const getUserInfo = require('../helpers.js').getUserInfo;


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
    res.status(200).json({
        token: `JWT ${generateJwt(userInfo)}`,
        user: userInfo,
    });
};


/**
 * Registration Route
 */

exports.register = (req, res, next) => {
    // TODO: Use the spread operator instead
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

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
            const token = generateJwt(user);
            res.status(201).json({
                token: `JWT ${token}`,
            });
        });
    });
};
