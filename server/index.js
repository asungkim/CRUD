const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser = require("body-parser");
const postsRouter = require("./routes/posts");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(body_parser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/posts", postsRouter); // /api/posts 로 시작하는 모든 요청이 라우터로 전달

app.get("/", (req, res) => {
  res.send("CRUD 게시판 API");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
