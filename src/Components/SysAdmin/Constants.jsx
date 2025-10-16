export const SideBarLinks = [
  { link: "dashboard", name: "Dshboard" },
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
        name: "Approved & Rejected ",
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

export const Documents = [
  {
    name: "Accreditation Certificate",
    status: "Pending",
  },
  
];