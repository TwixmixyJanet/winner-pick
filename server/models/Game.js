const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // castMembers: {
  //   type: [String],
  //   required: true,
  // },
  numMembers: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  groups: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  castMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "CastMember",
    },
  ],
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
    },
  ],
  currentEpisode: {
    type: Schema.Types.ObjectId,
    ref: "Episode",
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
