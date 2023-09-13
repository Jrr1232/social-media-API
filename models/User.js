const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: 'Email address is required',
            unique: true,
            trim: true,
            validate: [validateEmail, 'Please fill a valid email address'], // if validate function returns true the error message will be displayed
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

        },
        thoughts: {

        },
        friends: {

        }

    }
);
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.length.friends;
    });


module.exports = User