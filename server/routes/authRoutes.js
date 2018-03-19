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
      res.redirect(
        "https://momentum-server-bt13.herokuapp.com/api/loginSuccess"
      );
      res.send();
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(
      "https://momentum-server-bt13.herokuapp.com/api/logoutSuccess"
    );
    res.send();
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
