import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import CreatePost from "./pages/CreatePost";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PostCard from "./pages/PostPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<PostCard />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
        <Route path="categories" element={<Categories />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
