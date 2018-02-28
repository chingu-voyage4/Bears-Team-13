const mongoose = require('mongoose');
const { Schema } = mongoose;

const quoteSchema = new Schema({
  quoteText: String,
  quoteAuthor: String
});

mongoose.model('quotes', quoteSchema);