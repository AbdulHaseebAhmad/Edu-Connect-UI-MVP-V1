export const SideBarLinks = [
  { link: "dashboard", name: "Dshboard" },
  { link: "approvals", name: "Approvals" },
  {
    link: "invitations",
    name: "Invitations",
    subLinks: [
      {
        link: "/sysadmin/invitations/generate",
        name: "Generate Invitation",
      },
      {
        link: "/sysadmin/invitations/pending",
        name: "Pending Invitations",
      },
      {
        link: "/sysadmin/invitations/approved",
        name: "Approved Invitations",
      },
      {
        link: "/sysadmin/invitations/approvals/pending",
        name: "Pending Approvals",
      },
      {
        link: "/sysadmin/invitations/approvals/approved",
        name: "Approved Approvals",
      },
      {
        link: "/sysadmin/invitations/requests",
        name: "View Requests",
      },
    ],
  },
  { link: "settings", name: "Settings" },
];

export const InviteFormFields = [
  {
    name: "name",
    label: "School Name",
    type: "text",
    required: true,
    holder: "Enter school name",
  },
  {
    name: "email",
    label: "Contact Email",
    type: "email",
    required: true,
    holder: "Enter contact email",
  },
];
