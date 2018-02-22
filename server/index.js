const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const keys = require('./keys');
require('./models/Quotes');

mongoose.connect(keys.mongoURI);

const app = express();

getQuotes = async () => {
  const res = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
  console.log(res.data);
  const Quote = mongoose.model('quotes');
  const newQuote = new Quote({
    quoteText: res.data.quoteText,
    quoteAuthor: res.data.quoteAuthor
  });
  newQuote.save(err => {
    if (err) console.log(err);
  });
}

getQuotes();


app.get('/api/get_quote', (req, res) => {
  // console.log(req);
});

app.listen(5000);