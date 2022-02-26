const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minLength: 4,
        maxLength: 8,
        required: [true, 'Username is required and must be at least 4 characters, and no more than 8 characters.'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(value) {
               return isEmail(value); 
            },
            message: function(userObject) {
                return `${userObject.email} is not a valid email address`;
            },
        }
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee', 'Manager', 'Intern'],
    },
    powerLevel: {
        type: Number,
        min: 1,
        max: 10000000,
        default: 1,
    },
    hobbies: [ String ],
    twoFavoriteFoods: {
        firstFavorite: {
            type: String,
            trim: true,
        },
        secondFavorite: {
            type: String,
            trim: true,
        },
    }
});

const User = model('User', userSchema);

module.exports = User;