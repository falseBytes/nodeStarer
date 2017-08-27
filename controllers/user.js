const User = require('../models/User').User;


exports.getAll = (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) return next(err);
            res.status(200).send({users});
        });
};
