import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import SysAdminRoot from "./SysAdminRoot";
import AuthRoot from "./AuthRoot";
import GuestRoot from "./GuestRoot";
import DashboardPage from "../Pages/SysAdmin/DashboardPage";
import SendInvitePage from "../Pages/SysAdmin/SendInvitePage";
import SchoolInvite from "../Pages/SchoolAdmin/SchoolInvite";
import InvitationDashboard from "../Pages/SysAdmin/InvitationDashboard";
import SchoolAdminRoot from "./SchoolAdminRoot";

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
                    element: <DashboardPage />,
                  },
                  {
                    path: "invitations",
                    children: [
                      {
                        index: true,
                        element: <InvitationDashboard />,
                      },
                      {
                        path: "generate",
                        element: <SendInvitePage />,
                      },
                      {
                        path: "pending",
                        element: <p>pending invitations</p>,
                      },
                      {
                        path: "requests",
                        element: <p>requests</p>,
                      },
                      {
                        path: "approved",
                        element: <p>approved Invitations</p>,
                      },
                      {
                        path: "approvals",
                        children: [
                          {
                            path: "pending",
                            element: <p>pending approvals</p>,
                          },
                          {
                            path: "approved",
                            element: <p>approved approvals</p>,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    path: "settings",
                    element: <SendInvitePage />,
                  },
                ],
              },
            ],
          },
          {
            element: <SchoolAdminRoot />,
            children: [
              {
                path: "schooladmin",
                element: <h2>Hello School</h2>,
              },
            ],
          },
        ],
      },
      {
        path: "invites",
        children: [
          {
            path: ":id/:email",
            element: <SchoolInvite />,
          },
        ],
      },
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
