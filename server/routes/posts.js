const express = require("express");
const router = express.Router(); // GET, POST, PUT, PATCH
const { auth, adminOnly } = require("../middleware/auth");
const Post = require("../models/Post");

// CREATE
router.post("/", auth, async (req, res) => {
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
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to Find Posts" });
  }
});

// 특정 게시물 찾기
router.get("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to Find specific post" });
  }
});

// UPDATE
router.patch("/:postId", auth, adminOnly, async (req, res) => {
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
router.delete("/:postId", auth, adminOnly, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) return res.status(404).json({ message: err.message });
    res.status(200).json({ message: "Post Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
