import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import { BlogUser } from "./pages/BlogUser";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<BlogUser />} />
        <Route path="/add" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
