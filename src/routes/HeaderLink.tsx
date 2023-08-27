import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  title?: string;
  link: string;
}

const HeaderLink = ({ title, link }: SidebarLinkProps) => {
  return (
    <NavLink
      to={link ? link : "/"}
      className="block py-2 pr-4 pl-3 text-gray-400 rounded bg-primary-700 hover:text-white hover:bg-primary-600 focus:outline-none focus:text-white focus:bg-primary-600"
    >
      {({ isActive }) => (
        <>
          <div className={`${isActive && "text-white"}`}>{title}</div>
        </>
      )}
    </NavLink>
  );
};

export default HeaderLink;
