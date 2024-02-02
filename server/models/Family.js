const mongoose = require('mongoose');

const { Schema } = mongoose;

const familySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
