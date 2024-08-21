import "./App.css";
import { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  const [reload, setReload] = useState(false);

  const handleSuccess = () => setReload(!reload);

  return (
    <div>
      <h1>CRUD Board</h1>
      <PostForm onSuccess={handleSuccess} />
      <PostList key={reload} />
    </div>
  );
};

export default App;
