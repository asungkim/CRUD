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
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: "Failed to Create Post." });
  }
});

// 모든 게시물들 조회
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to Find Posts" });
  }
});

// 특정 게시물 찾기
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to Find specific post" });
  }
});

// UPDATE
router.patch("/:postId", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ message: err.message });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Failed to update Post" });
  }
});

//DELETE
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) return res.status(404).json({ message: err.message });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
