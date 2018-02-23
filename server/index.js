const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const keys = require('./keys');
require('./models/Quotes');

mongoose.connect(keys.mongoURI);

const app = express();


getQuotes = async () => {
  // let loopText;
  const res = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
  if (res.data.quoteText !== undefined) {
    const Quote = mongoose.model('quotes');
    Quote.remove({}).exec();
    data = (res.data.quoteText === undefined) ? await JSON.parse(res.data) : res.data;
    console.log(data.quoteText);
    const newQuote = new Quote({
      quoteText: data.quoteText,
      quoteAuthor: data.quoteAuthor
    });
    newQuote.save(err => {
      if (err) console.log(err);
    });
  }
}

setInterval(getQuotes, 5000);


app.get('/api/get_quote', (req, res) => {
  // console.log(req);
});

app.listen(5000);