const express = require("express");
const router = express.Router(); // GET, POST, PUT, PATCH
const Post = require("../models/Post");

// CREATE
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// 모든 게시물들 조회
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// 특정 아이디 찾기
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, content: req.body.content } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.delete({ _id: req.params.postId });
    res.json(deletedPost);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
