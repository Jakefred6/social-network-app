const mongoose = require("mongoose");
const { Thought, User } = require("../models");

// Function to get all thoughts with populated reactions
const getAllThoughts = async (req, res) => {
  try {
    // Find all thoughts, populate reactions, and exclude version field
    const thoughts = await Thought.find()
      .select("-__v") // Exclude version field
      .populate({
        path: "reactions",
        select: "-__v", // Exclude version field
      })
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get a single thought by its id with populated reactions
const getOneThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    // Find the thought by id, populate reactions, and exclude version field
    const thought = await Thought.findById(thoughtId)
      .select("-__v") // Exclude version field
      .populate({
        path: "reactions",
        select: "-__v", // Exclude version field
      });

    // Check if the thought exists
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to create a new thought and update the user's thought array field
const createThought = async (req, res) => {
  const { thoughtText, userId } = req.body;

  try {
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid userId, it should be a valid ObjectId from MongoDB _id",
      });
    }

    // Find the user by id
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new thought
    const newThought = await Thought.create({
      thoughtText,
      username: user?.username,
      userId,
    });

    // Add thought to user's thought array field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { thoughts: newThought._id } },
      { new: true } // Return updated user
    );

    // Check if the user exists
    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "Thought created but user not found to add thought" });
    }

    res.json(newThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update an existing thought
const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;

  try {
    // Update the thought by id with new thought text
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      {
        new: true,
        runValidators: true, // Force model to run validations again
      }
    );

    // Check if the thought exists
    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found to update" });
    }

    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a thought and remove it from users' thought array fields
const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    // Delete the thought by id
    const thought = await Thought.findByIdAndDelete(thoughtId);

    // Check if the thought exists
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Find all users who have this thought in their thought array field
    const users = await User.find({ thoughts: thoughtId });

    // User IDs to remove from thoughts array field
    const userIds = users.map((user) => user._id);

    // Remove the thought ID from the thought array field for each user
    await User.updateMany(
      { _id: { $in: userIds } },
      { $pull: { thoughts: thoughtId } }
    );

    res.json({
      message: "Thought deleted successfully and removed from users",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the functions for use in other files
module.exports = {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
};
