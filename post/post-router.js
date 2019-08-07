const router = require("express").Router();

let Info = require("../data/db.js");

router.get("/api/posts", (req, res) => {
  Info.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "You have been denied the posts!" });
    });
});

router.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    Info.findById(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(500).json({ error: "Can't retrieve post information. " });
      });
  } else {
    res.status(404).json({ message: "No post exists with that id." });
  }
});

router.post("/api/posts", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    Info.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was an error while adding the post." });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and content for the post." });
  }
});

router.put("/api/post/:id", (req, res) => {
  const id = req.params.id;
  const edit = req.body;

  if (id) {
    if (edit.title && edit.contents) {
      Info.update(id, edit)
        .then(update => {
          res.status(200).json(edit);
        })
        .catch(error => {
          res.status(500).json({ error: "The post could not be edited." });
        });
    } else {
      res
        .status(400)
        .json({ message: "Please provide both title and content" });
    }
  } else {
    res.status(404).json({ message: "No post exists with that id." });
  }
});

router.delete("api/post/:id", (req, res) => {
  const id = req.params.id;
  let oldPost = {};
  Info.findById(id).then(post => (oldPost = post[0]));

  if (id) {
    Info.remove(id)
      .then(post => {
        res.status(200).json({ message: "Post deleted", oldPost });
      })
      .catch(error => {
        res.status(500).json({ message: "Error while trying to delete post" });
      });
  } else {
    res.status(404).json({ message: "No post exists with that id" });
  }
});

module.exports = router;
