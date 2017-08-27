const User = require('../models/User').User;


exports.getAll = (req, res, next) => {
    const query = User.find({}).select({'email': 1, 'firstName': 1, 'lastName': 1, 'role': 1, '_id': 0});
    query.exec((err, users) => {
            if (err) return next(err);
            res.status(200).send(users);
        });
};
