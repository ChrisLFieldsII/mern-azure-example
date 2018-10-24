const mongoose = require('mongoose');

// This is just a blueprint so you'll always know what the model in the DB consists of
const ThoughtSchema = mongoose.Schema({
  thought: String,
  dateCreated: Date,
});

// This is the actual model used to interact with the DB!!!
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
