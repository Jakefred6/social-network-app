const mongoose = require("mongoose");
const { User, Thought } = require("../models");

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find()
      .select("-__v") // Exclude version field
      .populate({
        path: "thoughts",
        select: "-__v", // Exclude version field
      });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get a single user by its id
const getOneUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid userId, it should be a valid ObjectId from MongoDB _id",
      });
    }

    // Find the user by id
    const user = await User.findById(userId)
      .select("-__v") // Exclude version field
      .populate({
        path: "thoughts",
        select: "-__v", // Exclude version field
      })
      .populate({
        path: "friends",
        select: "-__v", // Exclude version field
      });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Create a new user with the provided username and email
    const newUser = await User.create({ username, email });

    // Send a success response with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update a user by its id
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    // Find the user by id and update it with the provided username and email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send a success response with the updated user
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a user by its id
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {

    // Validate if userId exists
    if(!userId){
      return res.status(400).json({ error: "User Id is required" });
    }

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

    // Remove the user from all friends lists
    await User.updateMany({ friends: userId }, { $pull: { friends: userId } });

    // BONUS PART
    // Remove all thoughts of the user by its username
    await Thought.deleteMany({username: user?.username});

    // Delete user
    await User.findByIdAndDelete(userId);

    // Send a success response with the deleted user
    res.json({ message: "User and associated thoughts deleted successfully and removed from Friend list of other people"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exporting the functions for use in other files
module.exports = {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
};
