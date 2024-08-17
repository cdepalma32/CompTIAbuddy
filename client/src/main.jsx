// defines routes, connects paths to the right pages/components

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
import Signup from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import ActivityList from "./components/ActivityList.jsx";
import CertificationList from "./components/CertificationList.jsx";
import ChapterList from "./components/ChapterList.jsx";
import ActivityDetail from "./pages/ActivityDetail.jsx";
import Progress from "./pages/Progress.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Tutorial from "./pages/Tutorial.jsx";
import Settings from "./pages/Settings.jsx";
import SignOut from "./pages/SignOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // app wraps the main layout
    error: <Error />, // handles any route errors (ie: 404's)
    children: [
      {
        index: true,  // The index route for "/"
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
      {
        path: "/certifications",
        element: <CertificationList />,
      },
      {
        path: "/certifications/:certificationId/chapters",
        element: <ChapterList />,
      },
      {
        path: "/certifications/:certificationId/chapters/:chapterId/activities",
        element: <ActivityList />,
      },
      {
        path: "/certifications/:certificationId/chapters/:chapterId/activities/:activityId",
        element: <ActivityDetail />,
      },
      {
        path: "/progress",
        element: <Progress />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tutorial",
        element: <Tutorial />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/signout",
        element: <SignOut />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
