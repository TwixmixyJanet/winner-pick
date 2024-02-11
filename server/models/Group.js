// GROUP is to denote members of the fantasy tv league

const mongoose = require("mongoose");

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
