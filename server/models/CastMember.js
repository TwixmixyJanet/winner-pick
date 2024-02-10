const mongoose = require("mongoose");

const { Schema } = mongoose;

const castMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  elimination: {
    type: Schema.Types.ObjectId,
    ref: "Elimination",
  },
});

const CastMember = mongoose.model("CastMember", castMemberSchema);

module.exports = CastMember;