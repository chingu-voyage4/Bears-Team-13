const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema({
  pictureUrl: String,
  pictureAttribution: String
});

mongoose.model('picture', pictureSchema);
