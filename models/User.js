/**
 * Created by hatim on 12/07/17.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');



const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


// Generate a hash for the password before any save operation
UserSchema.pre('save', (next) => {
    const SALT_FACTOR = 5;

    if (this.isModified('password')) {
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(this.password, salt, null, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
            });
        })
    }
});

// Method to compare password while login
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Create the model
let UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel
};