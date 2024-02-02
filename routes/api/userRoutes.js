const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// POST a new user
router.post("/", createUser);

// GET a single user by its id
router.get("/:userId", getOneUser);

// DELETE a user by its id
router.delete("/:userId", deleteUser);

// PUT/UPDATE a user by its id
router.put("/:userId", updateUser);

module.exports = router;
