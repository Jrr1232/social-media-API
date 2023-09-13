const { User, Thought } = require('../models')
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(Thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.postId });

            if (!thought) {
                return res.status(404).json({ message: 'No post with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new post
    async createThought(req, res) {
        try {
            const post = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { posts: post._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Post created, but found no user with that ID' });
            }

            res.json('Created the post 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
