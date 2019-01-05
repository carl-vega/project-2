require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var session = require("express-session");

var db = require("./models");
var User = db.User;

var app = express();
var PORT = process.env.PORT || 3000;

var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "appsecret-can-be-anything" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  var u = user[0].dataValues;
  console.log("Serializing user", u);
  done(null, JSON.stringify(u));
});
passport.deserializeUser(function(user, done) {
  console.log("Deserializing user", user);
  done(null, JSON.parse(user));
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "1958429797797275",
      clientSecret: "e7bf6276a7f2803f7ec90c8d6fdfaf26",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      var user = { username: profile.displayName, password: profile.id };
      User.findOrCreate({ where: user }).nodeify(cb);
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "535933504486-c46oa26qtkq4l9akka3nijse2pfqce00.apps.googleusercontent.com",
      clientSecret: "PG-7aXfGUd7mBj4DmuNM0j1J",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/home");
  }
);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

server.listen(PORT, () => {
  console.log("Server listening at port %d", PORT);
});

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// Routing
app.use(express.static(path.join(__dirname, "public")));

// Chatroom

var numUsers = 0;

io.on("connection", socket => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

module.exports = app;
