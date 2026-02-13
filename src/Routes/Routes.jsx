import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import SysAdminRoot from "./SysAdminRoot";
import AuthRoot from "./AuthRoot";
import GuestRoot from "./GuestRoot";
import DashboardPage from "../Pages/SysAdmin/Schools/DashboardPage";
import SendInvitePage from "../Pages/SysAdmin/Schools/SendInvitePage";
import SchoolInvite from "../Pages/SchoolAdmin/SchoolInvite";
import InvitationDashboard from "../Pages/SysAdmin/Schools/InvitationDashboard";
import SchoolAdminRoot from "./SchoolAdminRoot";
import PendingInvitesPage from "../Pages/SysAdmin/Schools/Invitations";
import PendingApprovals from "../Pages/SysAdmin/Schools/PendingApprovals";
import ApprovedApplications from "../Pages/SysAdmin/Schools/Applications";
import ConversationsPage from "../Pages/SysAdmin/Schools/InviteRequests";
import StudentAppLogin from "../Authentication/StudentAppLogin";
import StudentAppSignup from "../Authentication/StudentAppSignup";
import { VerificationPage } from "../Pages/SysAdmin/StudentsApp/VerificationPage";
import { StudentRegistryPage } from "../Pages/SysAdmin/StudentsApp/StudentsRegistry";
import { ApplicationsPage } from "../Pages/SysAdmin/StudentsApp/ApplicationsPage";
import { CommissionsPage } from "../Pages/SysAdmin/StudentsApp/CommissionsPage";
import { PlatformFinancePage } from "../Pages/SysAdmin/StudentsApp/PlatformFinance";
import StdDashboardPage from "../Pages/StudentAppPortal/StdDashboardPage";
import { StDashboardRoot } from "./StDashboardRoot";
import { UniGptPage } from "../Pages/StudentAppPortal/StdUnigptPage";
import { Countries } from "../Pages/StudentAppPortal/Countries";
import ProfilePage from "../Pages/StudentAppPortal/StdProfilePage";
import { OffersPage } from "../Components/studentAppPortal/Visa&Offers";
import { ScholarshipsPage } from "../Pages/StudentAppPortal/StdScholarshipPage";
import { MessagesPage } from "../Pages/StudentAppPortal/StdMessagesPage";
import { DocumentsPage } from "../Pages/StudentAppPortal/StdDocumentsPage";
import { ApplicationsPageP } from "../Pages/StudentAppPortal/StdApplicationsPage";
import { SchoolDashboardPage } from "../Pages/SchoolAdmin/SchoolDashboardPage";
import { SchoolVerificationPage } from "../Pages/SchoolAdmin/SchoolVerificationPage";
import SchoolProfilePage from "../Pages/SchoolAdmin/SchoolProfilePage";
import { SchoolFinancePage } from "../Pages/SchoolAdmin/SchoolFinancePage";
import { SchoolSupportPage } from "../Pages/SchoolAdmin/SchoolSupportPage";
import { SchoolStudentRoaster } from "../Pages/SchoolAdmin/SchoolStudentRoaster";
import UniversityRoot from "./UniversityRoot";
import UniDashboard from "../Pages/UniversityPortal/UniDashboard";
import ApplicationsManager from "../Pages/UniversityPortal/UniApplications";
import { EnrollmentPipelinePage } from "../Pages/UniversityPortal/UniEnrollement";
import UniversityProfilePage from "../Pages/UniversityPortal/UniProfile";
import { ProgramsPage } from "../Pages/UniversityPortal/UniPrograms";
import { IntegrationsPage } from "../Pages/UniversityPortal/UniIntegration";
import { SettingsPage } from "../Pages/UniversityPortal/UniSettings";
import UniversityLogin from "../Authentication/UniversityLogin";
import { VerifyStudentReceipt } from "../Pages/SysAdmin/StudentsApp/VerifyReceipt";
import StdPrograms from "../Pages/StudentAppPortal/StdPrograms";
import StdUniversities from "../Pages/StudentAppPortal/StdUniversities";
import StdProgram from "../Pages/StudentAppPortal/StdProgram";
import Destinations from "../Pages/StudentAppPortal/Destinations";
import UniversityDetails from "../Pages/StudentAppPortal/StdUniversityDetails";
import UniversitiesList from "../Pages/StudentAppPortal/StdUniversitiesList";

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
                    path: "schools",
                    children: [
                      {
                        index: true,
                        element: <InvitationDashboard />,
                      },
                      {
                        path: "invitations",
                        element: <PendingInvitesPage />,
                      },
                      {
                        path: "applications",
                        element: <ApprovedApplications />,
                      },
                      // {
                      //   path: "generate",
                      //   element: <SendInvitePage />,
                      // },
                      // {
                      //   path: "requests",
                      //   element: <ConversationsPage />,
                      // },
                      // {
                      //   path: "approve",
                      //   element: <PendingApprovals />,
                      // },
                    ],
                  },
                  {
                    path: "students",
                    children: [
                      {
                        index: true,
                        element: "incoming",
                      },
                      {
                        path: "verification",
                        element: <VerificationPage />,
                      },
                      {
                        path: "registry",
                        element: <StudentRegistryPage />,
                      },
                      {
                        path: "applications",
                        element: <ApplicationsPage />,
                      },
                      {
                        path: "commissions",
                        element: <CommissionsPage />,
                      },
                      {
                        path: "platform-finance",
                        element: <PlatformFinancePage />,
                      },
                      {
                        path: "receipts",
                        element: <VerifyStudentReceipt />,
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
            path: "schooladmin",
            children: [
              {
                index: true,
                element: <SchoolDashboardPage />,
              },
              {
                path: "verify-student",
                element: <SchoolVerificationPage />,
              },
              {
                path: "all-students",
                element: <SchoolStudentRoaster />,
              },
              {
                path: "profile",
                element: <SchoolProfilePage />,
              },
              {
                path: "finance",
                element: <SchoolFinancePage />,
              },
              {
                path: "support",
                element: <SchoolSupportPage />,
              },
            ],
          },
          {
            element: <StDashboardRoot />,
            children: [
              {
                path: "student",
                children: [
                  { path: "dashboard", element: <StdDashboardPage /> },
                  { path: "uni-gpt", element: <OffersPage /> },
                  {
                    path: "apply-to-university",
                    element: <Outlet />,
                    children: [
                      {
                        path: "destinations",
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: <Destinations />,
                          },
                          {
                            path: ":counntry_id",
                            element: <UniversitiesList />,
                          },
                        ],
                      },
                      {
                        path: "universities",
                        element: <Outlet />,
                        children: [
                          {
                            path: ":university_id",
                            element: <UniversityDetails />,
                          },
                        ],
                      },
                      {
                        path: "programs",
                        element: <Outlet />,
                        children: [
                          {
                            path: ":program_id",
                            element: <StdProgram />,
                          },
                        ],
                      },

                      // {
                      //   path: "countries",
                      //   element: <Outlet />,
                      //   children: [
                      //     {
                      //       index: true,
                      //       element: <Countries />,
                      //     },
                      //     {
                      //       path: ":country_id",
                      //       element: <StdUniversities />,
                      //     },
                      //     {
                      //       path: ":country_id/universities",
                      //       element: <Outlet />,
                      //       children: [
                      //         {
                      //           path: ":university_id",
                      //           element: <StdPrograms />,
                      //         },
                      //         {
                      //           path: ":university_id/programs/:program_id",
                      //           element: <StdProgram />,
                      //         },
                      //       ],
                      //     },
                      //   ],
                      // },
                    ],
                  },
                  {
                    path: "programs",
                    element: <StdPrograms />,
                  },
                  {
                    path: "scholarships",
                    element: <ScholarshipsPage />,
                  },
                  {
                    path: "applications",
                    element: <ApplicationsPageP />,
                  },
                  { path: "visa&offer", element: <OffersPage /> },
                  {
                    path: "verified-profile",
                    element: <ProfilePage />,
                  },
                  { path: "documents", element: <DocumentsPage /> },
                  { path: "messages", element: <MessagesPage /> },
                ],
              },
            ],
          },
          {
            element: <UniversityRoot />,
            children: [
              {
                path: "university",
                children: [
                  {
                    index: true,
                    element: <UniDashboard />,
                  },
                  {
                    path: "applicants",
                    element: <ApplicationsManager />,
                  },
                  {
                    path: "enrollment",
                    element: <EnrollmentPipelinePage />,
                  },
                  {
                    path: "profile",
                    element: <UniversityProfilePage />,
                  },
                  {
                    path: "programs",
                    element: <ProgramsPage />,
                  },
                  {
                    path: "integrations",
                    element: <IntegrationsPage />,
                  },
                  {
                    path: "settings",
                    element: <SettingsPage />,
                  },
                ],
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

      {
        path: "/student",
        children: [
          {
            path: "login",
            element: <StudentAppLogin />,
          },
          {
            path: "signup",
            element: <StudentAppSignup />,
          },
        ],
      },
      {
        path: "/university",
        children: [
          {
            path: "login",
            element: <UniversityLogin />,
          },
        ],
      },
    ],
  },
]);

export default router;
