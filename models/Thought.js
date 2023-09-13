const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,


        },
        username: {
            type: String,
            required: true

        },
        reactions: {

        }

    }
);
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.length.reactions;
    });
thoughtSchema
    .virtual('formattedCreatedAt')
    .get(function () {
        return this.createdAt.toISOString(); // Format createdAt as an ISO string
    });


module.exports = User