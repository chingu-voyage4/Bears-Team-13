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
      res.redirect("back");
      res.send();
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("back");
    res.send();
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
