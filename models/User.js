/**
 * Created by hatim on 12/07/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: true,
    },
    firstName: {
            type: String,
        },
    lastName: {
            type: String,
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPassword: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
});


// Generate a hash for the password before any save operation
UserSchema.pre('save', function(next) {
    const user = this;
    const SALT_FACTOR = 5;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(this.password, salt, null, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
            });
        });
    }
});

// Method to compare password while login
UserSchema.methods.comparePassword = function(condidatePassword, cb) {
    bcrypt.compare(condidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Create the model
let UserModel = mongoose.model('User', UserSchema);

module.exports = {
    'User': UserModel,
};
