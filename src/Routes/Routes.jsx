import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import SysAdminRoot from "./SysAdminRoot";
import AuthRoot from "./AuthRoot";
import GuestRoot from "./GuestRoot";
import SysAdminDashboard from "../Pages/SysAdmin/SysAdminDashboard";
import SysAdminInvitation from "../Pages/SysAdmin/SysAdminInvitation";
import SchoolInvite from "../Pages/SchoolAdmin/SchoolInvite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            element: <SysAdminRoot />,
            children: [
              {
                path: "sysadmin",
                children: [
                  {
                    path: "dashboard",
                    element:<SysAdminDashboard/>,
                  },
                  {
                    path: "approvals",
                    element: <SysAdminInvitation/>,
                  },
                  {
                    path: "invitations",
                    element: <SysAdminInvitation/>,
                  },
                  {
                    path: "settings",
                    element: <SysAdminInvitation/>,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path:"invites",
        children:[
          {
            path:":id/:email",
            element:<SchoolInvite/>
          }
        ]
      }
    ],
  },
  {
    element: <GuestRoot />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
