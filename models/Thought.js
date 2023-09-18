const { Schema, mongoose, model } = require('mongoose');

// Define a sub-document schema for reactions
const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const thoughtSchema = new Schema({
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
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

thoughtSchema.virtual('formattedCreatedAt')
    .get(function () {
        return this.createdAt.toISOString(); // Format createdAt as an ISO string
    });

const Thought = model('thought', thoughtSchema);


module.exports = Thought