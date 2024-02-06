const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const episodeSchema = new Schema({
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
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
  castMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "CastMember",
    },
  ],
  eliminated: [
    {
      type: Schema.Types.ObjectId,
      ref: "CastMember",
    },
  ],
});

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
