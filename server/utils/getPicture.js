const axios = require("axios");
const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = async () => {
  var res;
  try {
    res = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${
        keys.unsplashAppId
      }&orientation=landscape&query=landscape`
    );
  } catch (err) {
    console.log(err);
    return;
  }
  if (res.data.urls.full !== undefined && res.data.urls.full.length > 0) {
    const Picture = mongoose.model("picture");
    Picture.remove({}).exec();
    const newPicture = new Picture({
      pictureUrl: res.data.urls.full,
      pictureAttribution: `Photo by <a href="https://unsplash.com/${
        res.data.user.username
      }?utm_source=Momentum_Clone&utm_medium=referral">${
        res.data.user.name
      }</a> on <a href="https://unsplash.com/?utm_source=Momentum_Clone&utm_medium=referral">Unsplash</a>`
    });
    newPicture.save(err => {
      if (err) console.log(err);
    });
  }
};