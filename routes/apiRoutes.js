var db = require("../models");

module.exports = function(app) {
  // Get currently logged in user info
  app.get("/api/user_data", function(req, res) {
    console.log(
      "Getting user via /api/user_data for user " + JSON.stringify(req.user)
    );
    if (req.user === undefined) {
      // The user is not logged in
      res.json({});
    } else {
      res.json(req.user);
    }
  });

  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
