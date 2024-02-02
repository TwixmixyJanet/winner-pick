const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const recipeSchema = new Schema({
name: {
  type: String,
  required: true,
  trim: true
},
photo: {
  type: String,
  required: true,
  trim: true
},
cookingTime: {
  type: String,
  required: true,
},
instructions:{
  type: String,
  required: true
},
ingredients: {
  type: String,
  required: true
},
servingSize: {
  type: String,
  required: true
},
author:{ 
  type: String,
  required: true
},
createdAt:{
  type: Date,
  default: Date.now,
  get: (timestamp) => dateFormat(timestamp),
},
families: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
