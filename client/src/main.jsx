import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import CertificationList from "./components/CertificationList.jsx";
import CertificationDetail from "./components/CertificationDetail.jsx";
import ChapterList from "./components/ChapterList.jsx";
import ActivityDetail from "./pages/ActivityDetail.jsx";
import Progress from "./pages/Progress.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Tutorial from "./pages/Tutorial.jsx";
import Settings from "./pages/Settings.jsx";
import SignOut from "./pages/SignOut.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUpdateUserForm from "./components/AdminUpdateUserForm.jsx"; // Admin update form
import AdminUpdateCertificationForm from "./components/AdminUpdateCertificationForm.jsx"; // Admin update form
import UpdateUserForm from "./components/UpdateUserForm.jsx"; // User update form
import { QUERY_ME } from "./utils/queries"; // Import the QUERY_ME query

// Protected Route for Admin Dashboard
const ProtectedAdminRoute = ({ element }) => {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;
  if (error || !data?.me) return <Navigate to="/login" />; // Redirect to login on error or if user data is missing

  const isAdmin = data.me.username === "admin";

  return isAdmin ? element : <Navigate to="/" />; // Redirect to home if not admin
};

// Protected Route for User Profile
const ProtectedUserRoute = ({ element }) => {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;
  if (error || !data?.me) return <Navigate to="/login" />; // Redirect to login on error or if user data is missing

  return element; // Allow access if user is logged in
};

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
      {
        path: "/certifications",
        element: <CertificationList />,
      },
      {
        path: "/certifications/:id",
        element: <CertificationDetail />,
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
        path: "/admin",
        element: <ProtectedAdminRoute element={<AdminDashboard />} />,
      },
      {
        path: "/admin/update-user/:userId", // Admin update user route
        element: <ProtectedAdminRoute element={<AdminUpdateUserForm />} />,
      },
      {
        path: "/admin/update-certification/:certificationId",
        element: <AdminUpdateCertificationForm />,
      },

      {
        path: "/update-user", // User update profile route
        element: <ProtectedUserRoute element={<UpdateUserForm />} />,
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
