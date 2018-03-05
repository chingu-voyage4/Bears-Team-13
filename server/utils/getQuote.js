const axios = require("axios");
const mongoose = require("mongoose");

module.exports = async () => {
  const res = await axios.get(
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  );
  if (res.data.quoteText !== undefined && res.data.quoteText.length > 0) {
    const Quote = mongoose.model("quote");
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
