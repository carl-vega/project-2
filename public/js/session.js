$.getJSON("api/user_data", function(data) {
  // Make sure the data contains the username as expected before using it
  if (data.hasOwnProperty("username")) {
    $(".brand-logo").append(" - " + data.username);
  }
});
