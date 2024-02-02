const { Schema, Types } = require("mongoose");

// Defining the schema for a reaction
const reactionSchema = new Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: Types.ObjectId,
    },
    // Body of the reaction, required and limited to 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Username of the user who created the reaction, required
    username: {
      type: String,
      required: true,
    },
    // Timestamp of when the reaction was created, defaults to the current date and time
    createdAt: {
      type: Date,
      default: Date.now,
      // Custom getter function to format the timestamp to a readable string
      get: (timestamp) => timestamp.toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, // Disabling the virtual id getter
  }
);

// Exporting the reaction schema for use in other parts of the application
module.exports = reactionSchema;
