import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import AddGame from "./pages/AddGame.jsx";
import GroupGames from "./pages/GroupGames.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Game from "./pages/Game.jsx";
import EditGame from "./pages/EditGame.jsx";
import JoinedGames from "./pages/JoinedGames.jsx";
import NoMatch from "./pages/NoMatch.jsx";
// Import MDB
// Example: Adjust import path based on package structure or documentation
import * as mdb from "mdb-ui-kit"; // lib

window.mdb = mdb;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        index: false,
        element: <Dashboard />,
      },
      {
        path: "/addgame",
        index: false,
        element: <AddGame />,
      },
      {
        path: "/login",
        index: false,
        element: <Login />,
      },
      {
        path: "/game/:id",
        index: false,
        element: <Game />,
      },
      {
        path: "/groupgames/:groupId",
        index: false,
        element: <GroupGames />,
      },
      {
        path: "/editgame/:id",
        index: false,
        element: <EditGame />,
      },
      {
        path: "/search/",
        index: false,
        element: <Search />,
      },
      {
        path: "/joinedgames/",
        index: false,
        element: <JoinedGames />,
      },
    ],
  },
  {
    path: "*", // This is a catch-all route
    element: <NoMatch />,
  },
]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <Router>{router}</Router>
  </RouterProvider>
);
