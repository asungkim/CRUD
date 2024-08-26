import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  // const [reload, setReload] = useState(false);
  const [handlePostId, setHandlePostId] = useState(null);

  const handleSuccess = () => {
    // setReload(!reload);
    setHandlePostId(null); // 수정이 완료되면 수정 중인 상태를 초기화
  };

  const handleEdit = (postId) => {
    setHandlePostId(postId); // 수정할 게시물의 ID를 설정
  };

  return (
    <Router>
      <div>
        <h1>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Asung CRUD Board
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/create-post">게시물 작성</Link>
            </li>
            <li>
              <Link to="/posts">전체 게시물 조회</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/create-post"
            element={<PostForm onSuccess={handleSuccess} />}
          />
          <Route
            path="/posts"
            element={
              <PostList
                onEdit={handleEdit}
                editingPostId={handlePostId}
                onSuccess={handleSuccess}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
