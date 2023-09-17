const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

const {
    getSingleUser,
    getUsers } = require('../../controllers/userController')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)
// /api/thoughts/:userId
router.route('/:userId/').get(getSingleUser).post(createThought)
// /api/thoughts/:thoughtId/
router.route('/:thoughtId/').get(getUsers).put(updateThought)
// /api/thoughts/:thoughtId/:
router.route('/:thoughtId').get(getSingleUser).delete(deleteThought)

// /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReaction)

module.exports = router;