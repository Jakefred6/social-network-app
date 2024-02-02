const express = require("express");
const {
  createReaction,
  deleteReaction,
  getOneReaction,
  updateReaction,
} = require("../../controllers/reactionController");

const router = express.Router();

// POST to create a reaction
router.post("/:thoughtId", createReaction);

// GET one reaction
router.get("/:reactionId", getOneReaction);

// PUT/update a reaction
router.put("/:reactionId", updateReaction);

// DELETE to remove a reaction
router.delete("/:reactionId/thoughts/:thoughtId", deleteReaction);

module.exports = router;
