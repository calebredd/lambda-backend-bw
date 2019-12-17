const express = require("express"),
  server = express(),
  cors = require("cors"),
  helmet = require("helmet"),
  userRoute = require("../users/user-routes");
produceRoute = require("../produce/produce-routes");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<div><h1>Welcome to the Server for your Build Week!</h1><h2>Click here to view the API <a href="./api">documentation</a></h2></div>`
    );
});
server.get("/api", (req, res) => {
  res.status(200).send(
    `<div>
      <h1>Welcome to the API Documentation</h1>
    </div>`
  );
});
server.use("/api/users", userRoute);
server.use("/api/produce", produceRoute);

module.exports = server;
