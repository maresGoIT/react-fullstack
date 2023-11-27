import { HiBookOpen, HiAcademicCap } from "react-icons/hi";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      id: "1",
      name: "University",
      icon: <HiAcademicCap />,
      path: "/",
    },
    {
      id: "2",
      name: "Faculties",
      icon: <HiBookOpen />,
      path: "/faculties",
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBrandBox}></div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ""].join(" ")
              }
            >
              {item.icon} {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
