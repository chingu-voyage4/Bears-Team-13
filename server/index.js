const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const keys = require('./config/keys');
require('./models/Quote');
require('./models/Picture');

mongoose.connect(keys.mongoURI, err => {
  if (err) console.log(err);
});

const app = express();

getQuote = async () => {
  const res = await axios.get(
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  );
  if (res.data.quoteText !== undefined && res.data.quoteText.length > 0) {
    const Quote = mongoose.model('quote');
    Quote.remove({}).exec();
    const newQuote = new Quote({
      quoteText: res.data.quoteText,
      quoteAuthor: res.data.quoteAuthor
    });
    newQuote.save(err => {
      if (err) console.log(err);
    });
  }
};

getPicture = async () => {
  var res;
  try {
    res = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${keys.unsplashAppId}`
    );
  } catch (err) {
    console.log(err);
    return;
  }
  if (res.data.urls.full !== undefined && res.data.urls.full.length > 0) {
    const Picture = mongoose.model('picture');
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

setInterval(function() {
  getQuote();
  getPicture();
}, 90 * 1000);

app.get('/api/get_quote', async (req, res) => {
  const Quote = mongoose.model('quote');
  const currentQuote = await Quote.findOne({});
  res.send(currentQuote);
});

app.get('/api/get_picture', async (req, res) => {
  const Photo = mongoose.model('picture');
  const currentPhoto = await Photo.findOne({});
  res.send(currentPhoto);
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening to port ${process.env.PORT || 5000}`)
);
