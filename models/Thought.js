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
            reactionId:
            {
                type: Schema.Types.ObjectId,
                default: Schema.Types.ObjectId,
            },
            reactionBody: {
                type: String,
                required: true,
                maxLength: 280,

            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,


            }



        }


    }, {
    toJSON: {
        virtuals: true,
    },
    id: false,
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

const Thought = model('thought', thoughtSchema);


module.exports = User