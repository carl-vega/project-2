var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load sign up page
  app.get("/signup", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("signup", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load home page
  app.get("/home", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("home", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load sign up page
  app.get("/contact", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("contact", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load tictactoe page
  app.get("/tictactoe", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("tictactoe", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
