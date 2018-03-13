const mongoose = require("mongoose");
const { Schema } = mongoose;

const pictureSchema = new Schema({
  pictureUrl: String,
  pictureByUsername: String,
  pictureByName: String,
  pictureLocation: String,
  pictureAttribution: String
});

mongoose.model("picture", pictureSchema);
