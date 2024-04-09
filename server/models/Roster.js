const mongoose = require("mongoose");

const { Schema } = mongoose;

const rosterSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
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
});

const Roster = mongoose.model("Roster", rosterSchema);

module.exports = Roster;
