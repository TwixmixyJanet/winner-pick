const mongoose = require("mongoose");

const { Schema } = mongoose;

const coinSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
