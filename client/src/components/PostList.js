import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const PostList = ({ onEdit, editingPostId, onSuccess }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [onSuccess]);

  const deletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => onEdit(post._id)}>Edit</button>{" "}
            {/* Edit 버튼 */}
            <button onClick={() => deletePost(post._id)}>Delete</button>
            {/* 수정할 게시물에 대해 PostForm을 렌더링 */}
            {editingPostId === post._id && (
              <PostForm post={post} onSuccess={onSuccess} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
