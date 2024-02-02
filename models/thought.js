const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Defining the schema for a thought
const thoughtSchema = new Schema(
  {
    // Text of the thought, required and limited to 280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Timestamp of when the thought was created, defaults to the current date and time
    createdAt: {
      type: Date,
      default: Date.now,
      // Custom getter function to format the timestamp to a readable string
      get: (timestamp) => timestamp.toLocaleString(),
    },
    // Username of the user who created the thought, required
    username: {
      type: String,
      required: true,
    },
    // Array of reactions associated with the thought, using the reactionSchema
    reactions: [reactionSchema],
  },
  // Schema settings
  {
    toJSON: {
      virtuals: true, // Include virtual properties when data is requested

      getters: true, // Include getters when data is requested
      // (Getters are special functions that are used to transform the representation of data
      // that is going to be sent to the client. In this case, the getter is used to format the timestamp to a readable string.)
    },
    id: false, // Don't include the default mongoose _id
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Creating the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Exporting the Thought model for use in other parts of the application
module.exports = Thought;
