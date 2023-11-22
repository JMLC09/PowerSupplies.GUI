import routes from "../.././routes/routes";
import HeaderLink from "../../routes/HeaderLink";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={"/home"} className="flex items-center">
            <img src="ps.svg" className="mr-3 h-9" alt="PowerSupplies Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Power Supplies
            </span>
          </Link>
          <div className="flex items-center order-2">
            <NavLink
              to={"/login"}
              className="text-white bg-blue-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-gray-800"
            >
              Iniciar Sesion
            </NavLink>
          </div>
          <ul className="flex flex-row font-medium space-x-8 mt-0">
            {routes
              .filter((route) => route.showInHeader)
              .map((route, index) => (
                <HeaderLink key={index} title={route.title} link={route.path} />
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
