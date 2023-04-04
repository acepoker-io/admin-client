import { createContext } from "react";

const AdminContext = createContext({
  admin: {},
  setAdmin: () => {},
  sidebar: {},
  setSidebar: () => {},
});
export default AdminContext;
