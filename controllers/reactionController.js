const mongoose = require("mongoose");
const { Thought, User } = require("../models");

// Function to create a reaction for a specific thought
const createReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, userId } = req.body;

  try {
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({
        error:
          "Invalid thoughtId, it should be a valid ObjectId from MongoDB _id",
      });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid userId, it should be a valid ObjectId from MongoDB _id",
      });
    }

    // Validate if reactionBody is not empty
    if (!reactionBody) {
      return res.status(400).json({ error: "Reaction body is required" });
    }

    // Validate if the thought exists
    const thoughtExists = await Thought.exists({ _id: thoughtId });
    if (!thoughtExists) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Validate if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Finding the thought by its id and updating it to add a new reaction
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $addToSet: {
          reactions: { reactionBody, username: userExists?.username },
        },
      },
      { new: true }
    );

    // Checking if the thought exists
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Sending the updated thought as a response
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a reaction from a specific thought
const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    // Finding the thought by its id and updating it to remove a specific reaction
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    // Checking if the thought exists
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Sending the updated thought as a response
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get one reaction by its id
const getOneReaction = async (req, res) => {
  const { reactionId } = req.params;

  try {
    // Finding the reaction by its id from the thought collection
    const thoughts = await Thought.findOne({
      reactions: { $elemMatch: { _id: reactionId } },
    });

    // Checking if the reaction exists
    if (!thoughts) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    // Finding the reaction by its id
    const reaction = thoughts?.reactions?.find(
      (reaction) => reaction._id.toString() === reactionId
    ) || { error: "Reaction not found" };

    // Sending the reaction as a response
    res.json(reaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update a reaction by its id
const updateReaction = async (req, res) => {
  const { reactionId } = req.params;
  const { reactionBody } = req.body;

  try {
    // Validate if reactionBody is not empty
    if (!reactionBody) {
      return res.status(400).json({ error: "Reaction body is required" });
    }

    // Validate if reactionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reactionId)) {
      return res.status(400).json({
        error:
          "Invalid reactionId, it should be a valid ObjectId from MongoDB _id",
      });
    }

    // Finding the reaction by its id and updating it with the new reaction body
    const updatedReaction = await Thought.findOneAndUpdate(
      { "reactions._id": reactionId },
      { $set: { "reactions.$.reactionBody": reactionBody } },
      { new: true }
    );

    // Checking if the reaction exists
    if (!updatedReaction) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    // Sending the updated reaction as a response
    res.json(updatedReaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the functions for use in other files
module.exports = {
  createReaction,
  deleteReaction,
  getOneReaction,
  updateReaction,
};
