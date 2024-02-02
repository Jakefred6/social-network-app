const express = require("express");
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

const router = express.Router();

// GET all thoughts
router.get("/", getAllThoughts);

// GET one thought
router.get("/:thoughtId", getOneThought);

// POST a new thought
router.post("/", createThought);

// PUT/update a thought
router.put("/:thoughtId", updateThought);

// DELETE a thought
router.delete("/:thoughtId", deleteThought);

module.exports = router;
