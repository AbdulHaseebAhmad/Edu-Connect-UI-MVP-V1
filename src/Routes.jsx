import { createBrowserRouter } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  
]);

export default router;