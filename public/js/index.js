// Sign up page validation
$("#reg-form").validate({
  rules: {
    user: {
      required: true,
      minlength: 2
    },
    pass: {
      required: true,
      minlength: 5
    },
    confirm_pass: {
      required: true,
      minlength: 5,
      equalTo: "#pass"
    }
  },
  //Error messages
  messages: {
    user: {
      required: "Please enter your first name.",
      minlength: "You sure you're named with one letter?"
    },
    pass: {
      required: "Please enter a password.",
      minlength: "Password must be at least 5 characters."
    },
    confirm_pass: {
      required: "Please confirm your password.",
      minlength: "Password must be at least 5 characters.",
      equalTo: "Password does not match."
    }
  }
});

// API Post for new users
$("#signupBtn").on("click", function(event) {
  event.preventDefault();

  // Make a new user object
  var newUser = {
    username: $("#username")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim()
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new", newUser).then(function(data) {
    console.log(data);
    alert("Adding new user...");
  });
});
