export const SideBarLinks = [
  { link: "dashboard", name: "Dshboard" },
  {
    link: "schools",
    name: "Schoools",
    subLinks: [
      // {
      //   link: "/sysadmin/invitations/generate",
      //   name: "Generate Invitation",
      // },
      {
        link: "/sysadmin/schools/invitations",
        name: "School Invitations",
      },
      {
        link: "/sysadmin/schools/applications",
        name: "School Applications ",
      },
      // {
      //   link: "/sysadmin/schools/approve",
      //   name: "Approve Applications ",
      // },
      // {
      //   link: "/sysadmin/schools/requests",
      //   name: "View Requests",
      // },
    ],
  },
  {
    link: "students",
    name: "Students",
    subLinks: [
      // { name: "Dashboard", link:"/sysadmin/students/dashboard" },
      { name: "Registered Students", link:"/sysadmin/students/registry" },
      { name: "Verify Applications", link:"/sysadmin/students/verification" },
      { name: "Verify Program Receipts", link:"/sysadmin/students/receipts" },
      { name: "Scholarships", link:"/sysadmin/students/scholarships" },
      { name: "Webinars", link:"/sysadmin/students/webinars" },
      { name: "Applications", link:"/sysadmin/students/applications" },
    ], 
  },
  {
    link:"platform",
    name:"Platform",
    subLinks:[
      { name: "Commssions", link:"/sysadmin/platform/commissions" },
      { name: "Platform Finance", link:"/sysadmin/platform/platform-finance" },

    ]
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

export const reviewSchoolFormFields = [
  "School Name",
  "Admin Name",
  "Email",
  "Phone",
  "Country",
  "School Id",
  "Curriculum",
  "Branch",
  "City",
];
