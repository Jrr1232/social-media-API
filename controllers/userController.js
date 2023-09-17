const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)

        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            console.log(err)

        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)

        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.userId

            const dbUserData = await User.updateOne(
                { _id: userId },
                { $set: req.body } // Update with the data from the request body

            );
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)

        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.userId

            const dbUserData = await User.deleteOne(
                { _id: userId },

            );
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)

        }
    },

    async createFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'Friend Created' })
            }
            res.json('Created the Friend 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const friend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'Friend Deleted' })
            }
            res.json('Deleted the Friend 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};