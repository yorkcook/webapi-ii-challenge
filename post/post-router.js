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

module.exports = router;
