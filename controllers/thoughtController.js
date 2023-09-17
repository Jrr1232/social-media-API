const { User, Thought, Reaction } = require('../models')
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'thought created, but found no user with that ID' });
            }

            res.json('Created the thought 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtId = req.params.thoughtId
            const thought = await Thought.updateOne(
                { _id: thoughtId },
                { $set: req.body }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "Couldn't locate thought by its id" });
            }

            res.json('Updated the thought 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtId = req.params.thoughtId

            const thoughtData = await Thought.deleteOne(
                { _id: thoughtId },

            );
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)

        }
    },
    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: reaction._id } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that id' });
            }

            res.json('Created the reaction 🎉');

        } catch (err) {
            console.log(err)
        }
    }
};
