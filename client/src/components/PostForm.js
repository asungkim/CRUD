import React, { useState, useEffect } from "react";
import axios from "axios";

// 게시물 생성 및 업데이트

const PostForm = ({ post, onSuccess }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  const submitForm = (e) => {
    e.preventDefault();

    const data = { title, content };

    if (post) {
      axios
        .patch(`/api/posts/${post._id}`, data)
        .then(() => onSuccess())
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`/api/posts`, data)
        .then(() => {
          onSuccess();
          setTitle("");
          setContent("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">{post ? "Update" : "Create"}</button>
    </form>
  );
};

export default PostForm;
