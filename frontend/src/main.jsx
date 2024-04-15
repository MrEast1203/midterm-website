import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { RootIndex } from "./pages";
import About from "./pages/about";
import "./index.css";
import UserPage from "./pages/users";
import CreateUserPage from "./pages/create-user";
import ErrorPage from "./pages/error-page";
import ChatPage from "./pages/chat";
import LoginPage from "./pages/login";
import MyAccountPage from "./pages/myaccount";
import { UserProvider } from "./hooks/userHooks";
import AIPage from "./pages/ai-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RootIndex /> },
      {
        path: "/about",
        element: <About />,
      },
      // {
      //   path: "/users",
      //   element: <UserPage />,
      // },
      // {
      //   path: "/create-user",
      //   element: <CreateUserPage />,
      // },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/myaccount",
        element: <MyAccountPage />,
      },
      {
        path: "/ai_page",
        element: <AIPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
