import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/Main/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddFood from "../Pages/AddFood/AddFood";
import MyItems from "../Pages/MyItems/MyItems";
import Fridge from "../Pages/Fridge/Fridge";
import PrivateRouter from "./PrivateRouter";
import Details from "../Components/Details/Details";
import NotFound from "../Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "addFood",
        element: (
          <PrivateRouter>
            <AddFood />
          </PrivateRouter>
        ),
      },
      {
        path: "myItems",
        element: (
          <PrivateRouter>
            <MyItems />
          </PrivateRouter>
        ),
      },
      {
        path: "fridge",
        element: (
          <PrivateRouter>
            <Fridge />
          </PrivateRouter>
        ),
      },
      {
        path: "fridgeFood/:id",
        Component: Details,
        loader: ({params}) => fetch(`https://assignment-sooty-psi.vercel.app/fridgeFood/${params.id}`)
      }
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);
