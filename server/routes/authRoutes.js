const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // res.redirect("https://momentum1-ehutc00f.c9users.io/");
      res.redirect("http://localhost:3000/");
      res.send();
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    // res.redirect("https://momentum1-ehutc00f.c9users.io/");
    res.redirect("http://localhost:3000/");
    res.send();
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
