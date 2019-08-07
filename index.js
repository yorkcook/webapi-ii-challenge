const express = require("express");

const postRouter = require("./post/post-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

server.listen(6000, () => {
  console.log("Server reporting for duty from port 6000!!");
});
