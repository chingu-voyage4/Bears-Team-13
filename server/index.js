const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const keys = require('./keys');
require('./models/Quotes');

mongoose.connect(process.env.mongoURI || keys.mongoURI);

const app = express();

getQuotes = async () => {
  const res = await axios.get(
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  );
  if (res.data.quoteText !== undefined) {
    const Quote = mongoose.model('quotes');
    Quote.remove({}).exec();
    data =
      res.data.quoteText === undefined ? await JSON.parse(res.data) : res.data;
    // console.log(data.quoteText);
    const newQuote = new Quote({
      quoteText: data.quoteText,
      quoteAuthor: data.quoteAuthor
    });
    newQuote.save(err => {
      if (err) console.log(err);
    });
  }
};

setInterval(getQuotes, 10 * 1000);

app.get('/api/get_quote', async (req, res) => {
  const Quote = mongoose.model('quotes');
  const currentQuote = await Quote.findOne();
  res.send(currentQuote);
});

app.listen(process.env.PORT || 5000);
