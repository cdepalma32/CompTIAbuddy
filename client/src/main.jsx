import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";

import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import ActivityList from "./components/ActivityList.jsx";
import CertificationLIst from "./components/CertificationList.jsx";
import ChapterList from "./components/ChapterList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
