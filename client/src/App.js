import "./App.css";
import { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  const [reload, setReload] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const handleSuccess = () => {
    setReload(!reload);
    setEditingPostId(null); // 수정이 완료되면 수정 중인 상태를 초기화
  };

  const handleEdit = (postId) => {
    setEditingPostId(postId); // 수정할 게시물의 ID를 설정
  };

  return (
    <div>
      <h1>CRUD Board</h1>
      <PostForm onSuccess={handleSuccess} />
      <PostList
        key={reload}
        onEdit={handleEdit}
        editingPostId={editingPostId} // 현재 수정 중인 게시물 ID를 전달
        onSuccess={handleSuccess} // 수정 완료 시 호출
      />
    </div>
  );
};

export default App;
