import React from "react";
import "./style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  {Register} from "./pages/Users/Register";
 import {Login} from "./pages/Users/Login"
import Home from "./pages/main/Home";
import Create from "./pages/Books/Create";
import Dashboard from "./pages/Books/Dashboard";
import Update from "./pages/Books/Update";
  import {PageNotFound} from "./pages/main/PageNotFound"

const router = createBrowserRouter([
{path: "/", element :<Home/> },
{path: "/register", element :<Register/> },
{path: "/login", element :<Login/> },
{path: "/create", element :<Create/> },
{path: "/dashboard", element :<Dashboard/> },
{path: "/update", element :<Update/> },
{path: "/*", element :<PageNotFound/> },
])

function App() {
return (
<div className="app">
 < RouterProvider router={router} />
</div>
);
}
export default App;