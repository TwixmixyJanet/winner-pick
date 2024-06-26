const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Game = require("./Game");
const Group = require("./Group");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  coins: {
    type: Schema.Types.ObjectId,
    ref: "Coin",
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
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
  rosters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Roster",
    },
  ],
  eliminations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Elimination",
    },
  ],
  joinedGames: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
