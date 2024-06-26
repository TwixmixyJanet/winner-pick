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
  coinBuyIn: {
    type: Number,
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
  eliminations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Elimination",
    },
  ],
  rosters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Roster",
    },
  ],
  // draftedMembers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "CastMember",
  //   },
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
