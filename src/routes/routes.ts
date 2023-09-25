import Home from "../pages/Home/Home";
import Inventory from "../pages/Inventory/Inventory";
import Login from "../pages/Login/Login";
import MakeOrder from "../pages/MakeOrder/MakeOrder";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import Order from "../pages/Orders/Order";
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
    path: "/order",
    component: Order,
    isProtected: false,
    title: "Ordenes",
    allowedRoles: ["ALL"],
    showInHeader: true,
  },
  {
    path: "/order/:id",
    component: OrderDetails,
    isProtected: false,
    allowedRoles: ["ALL"],
    showInHeader: false,
  },
  {
    path: "/makeOrder",
    component: MakeOrder,
    isProtected: false,
    allowedRoles: ["ALL"],
    showInHeader: false,
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
