const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const keys = require('./config/keys');
require('./models/Quotes');

mongoose.connect(keys.mongoURI, err => {
  if (err) console.log(err);
});

const app = express();

getQuotes = async () => {
  const res = await axios.get(
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  );
  if (res.data.quoteText !== undefined && res.data.quoteText.length > 0) {
    const Quote = mongoose.model('quotes');
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

setInterval(getQuotes, 10 * 1000);

app.get('/api/get_quote', async (req, res) => {
  console.log('Incoming request');
  const Quote = mongoose.model('quotes');
  console.log(process.env.NODE_ENV + ' : ' + keys.mongoURI);
  const currentQuote = await Quote.findOne({});
  console.log(`Fetched quote : ${currentQuote}`);
  res.send(currentQuote);
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening to port ${process.env.PORT || 5000}`)
);
