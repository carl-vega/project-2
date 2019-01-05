var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // handle facebook oauth responsee
  app.get("/#_=_", function(req, res) {
    res.render("index");
  });

  // Load sign up page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load home page
  app.get("/home", function(req, res) {
    res.render("home");
  });

  // Load global chat
  app.get("/chat", function(req, res) {
    res.render("chat");
  });

  // Load contact page
  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  // Load tictactoe page
  app.get("/tictactoe", function(req, res) {
    res.render("tictactoe");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
