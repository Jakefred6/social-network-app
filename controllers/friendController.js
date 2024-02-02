const mongoose = require("mongoose");
const { User } = require("../models");

// Function to add a friend to a user's friend list
const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "Invalid userId, it should be a valid ObjectId from MongoDB _id",
    });
  }

  // Validate if friendId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({
      error: "Invalid friendId, it should be a valid ObjectId from MongoDB _id",
    });
  }

  // Validate if user and friend are the same person
  if (userId === friendId) {
    return res
      .status(400)
      .json({ error: "You cannot add yourself as a friend" });
  }

  // Check if the user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validate if user already has the friend in their friend list
  const user = await User.findById(userId);
  if (user.friends.includes(friendId)) {
    return res.status(400).json({
      error: "You already have this friend in your friend list",
    });
  }

  try {
    // Add a friend to user's friend list
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    // Check if the user and friend exist
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to remove a friend from a user's friend list
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  // Validate if friendId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({ error: "Invalid friendId" });
  }

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  // Check if the user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // Remove friend from user's friend list
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    // Check if the user and friend exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the functions for use in other files
module.exports = {
  addFriend,
  removeFriend,
};
