const express = require("express");
const userRoutes = require("./api/userRoutes");
const thoughtRoutes = require("./api/thoughtRoutes");
const friendRoutes = require("./api/friendRoutes");
const reactionRoutes = require("./api/reactionRoutes");

const router = express.Router();

// All ROUTES
router.use("/api/users", userRoutes);
router.use("/api/users", friendRoutes);
router.use("/api/thoughts", thoughtRoutes);
router.use("/api/reactions", reactionRoutes);

module.exports = router;
