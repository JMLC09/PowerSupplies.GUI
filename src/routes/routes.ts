import Home from "../pages/Home/Home";
import Inventory from "../pages/Inventory/Inventory";
import MaterialEntry from "../pages/MaterialsEntry/MaterialsEntry";
import Login from "../pages/Login/Login";
import Order from "../pages/Order/Order";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

interface Route {
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  title?: string;
  allowedRoles: string[];
  showInHeader: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    component: Home,
    isProtected: false,
    title: "Home",
    allowedRoles: ["ALL"],
    showInHeader: true,
  },
  {
    path: "/inventory",
    component: Inventory,
    isProtected: false,
    title: "Inventario",
    allowedRoles: ["ALL"],
    showInHeader: true,
  },
  {
    path: "/materialentry",
    component: MaterialEntry,
    isProtected: false,
    title: "Entrada Material",
    allowedRoles: ["ALL"],
    showInHeader: true,
  },
  {
    path: "/order",
    component: Order,
    isProtected: false,
    title: "Ordenes",
    allowedRoles: ["ALL"],
    showInHeader: true,
  },
  {
    path: "/login",
    component: Login,
    isProtected: false,
    title: "Login",
    allowedRoles: ["ALL"],
    showInHeader: false,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
    isProtected: false,
    allowedRoles: ["ALL"],
    showInHeader: false,
  },
];

export default routes;
