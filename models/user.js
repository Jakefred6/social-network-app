const { Schema, model } = require("mongoose");

// Defining the schema for a user
const userSchema = new Schema(
  {
    // Username of the user, unique, trimmed, and required
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    // Email of the user, unique, required, and must match a valid email pattern
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Enter a valid email"],
    },
    // Array of thought IDs associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Array of friend IDs associated with the user, referencing the User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  // Schema settings
  {
    toJSON: {
      virtuals: true, // Include virtual properties when data is requested
    },
    id: false, // Don't include the default mongoose _id
  }
);

// Virtual to get the length of the user's friends array
userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// Creating the User model using the userSchema
const User = model("User", userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
