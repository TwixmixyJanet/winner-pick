const mongoose = require("mongoose");

const { Schema } = mongoose;

const castMemberSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  // photo: {
  //     type: String,
  //     required: true,
  //     trim: true,
  // },
  // description: {
  //     type: String,
  //     required: true,
  // },
  // groups: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Group",
  //   },
  // ],
  rosters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Roster",
    },
  ],
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  elimination: {
    type: Schema.Types.ObjectId,
    ref: "Elimination",
  },
});

const CastMember = mongoose.model("CastMember", castMemberSchema);

module.exports = CastMember;
