import { useSelector } from "react-redux";
import {createBrowserRouter,RouterProvider,redirect,} from "react-router-dom";
import SignIn from "./components/pages/authentication/Sign";
import Header from "./layouts/Header";
import { initializeWebSocket } from "./wsConnection";
import { useEffect } from "react";
import Home from "./components/pages/home";

import './App.css'

function App() {
  useEffect(() => {
    const ws:any = initializeWebSocket();
    return () => {ws.close();};
  }, []);
  const authenticated = useSelector((state:any) => state.auth.authenticated);
  const router = createBrowserRouter([
    {
      path: "login",
      element: <SignIn />,
      loader: async () => (authenticated ? redirect("/") : null),
    },
    {
      path: "/",
      element: <Header/>,
      children: [
        {
          path: "/",
          element:<Home/>,
        },
      ],
      loader: async () => (authenticated ? null : redirect("/login")),
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App
