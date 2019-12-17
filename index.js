const express = require("express"),
  server = require("./api/server.js"),
  port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Server has begun on port:" + port);
});
