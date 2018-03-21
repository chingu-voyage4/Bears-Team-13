const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const keys = require("./config/keys");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
require("./models/Quote");
require("./models/Picture");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/globalRoutes")(app);
require("./routes/authRoutes")(app);

setInterval(function() {
  require("./utils/getPicture")();
  require("./utils/getQuote")();
}, 900000);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening to port ${process.env.PORT || 5000}`)
);
