const keys = require("../config/keys");
const mongoose = require("mongoose");

module.exports = app => {
  app.get("/api/get_quote", async (req, res) => {
    const Quote = mongoose.model("quote");
    const currentQuote = await Quote.findOne({});
    res.send(currentQuote);
  });

  app.get("/api/get_picture", async (req, res) => {
    const Photo = mongoose.model("picture");
    const currentPhoto = await Photo.findOne({});
    res.send(currentPhoto);
  });

  app.post("/api/update_todo", async (req, res) => {
    if (!req.user) {
      return res.status(401).send("Please login to Sync");
    }
    const User = mongoose.model("users");
    console.log(JSON.stringify(req.body));
    const newUser = await User.findByIdAndUpdate(req.user.id, {
      todo: JSON.stringify(req.body)
    });
    console.log(newUser);
  });
};
