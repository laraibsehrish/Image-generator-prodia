
// Define the type for navigation items
export type NavItem = {
  name: string;
  to: string;
  // icon: React.ReactNode;
};

// Define navigation items
const navigation: NavItem[] = [
  { name: "Workspaces", to: "/workspace" },
  { name: "Roles", to: "/roles" },
  { name: "Permissions", to: "/permissions" },
  { name: "Users", to: "/user" },
];

export default navigation;
