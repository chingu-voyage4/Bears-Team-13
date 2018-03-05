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
};
