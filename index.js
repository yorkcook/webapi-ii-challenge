const express = require("express");

const postRouter = require("./post/post-router.js");

const server = express();

server.use(express.json());

server.use("/", postRouter);

server.listen(5004, () => {
  console.log("Server reporting for duty from port 5001!!");
});
