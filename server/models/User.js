const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  localStorage: Schema.Types.Mixed
});

mongoose.model("users", userSchema);
