const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const eliminationSchema = new Schema({
  order: {
    type: Number,
    required: true,
    trim: true,
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  castMembers: {
    type: Schema.Types.ObjectId,
    ref: "CastMember",
  },
});

const Elimination = mongoose.model("Elimination", eliminationSchema);

module.exports = Elimination;
