import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
