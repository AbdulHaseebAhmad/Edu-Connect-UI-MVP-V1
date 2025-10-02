import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import SysAdminRootElement from "./SysAdminRootElement";
import AuthElement from "../Authentication/AuthElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <AuthElement />,
        children: [
          {
            element: <SysAdminRootElement />,
            children: [
              {
                path: "sysadmin",
                children: [
                  {
                    path: "settings",
                    element: <p>Settings Pagge For SysAdmins</p>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
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
