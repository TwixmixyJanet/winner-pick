// GROUP is to denote members of the fantasy tv league

const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
