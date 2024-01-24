import { Logo } from "@/shared";
import { DashboardUserProfile } from "@/widgets/auth";
import { NavLink, routes } from "@/lib/routing";
import {
  faFolder,
  faGear,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";

const navLinks: NavLink[] = [
  {
    name: "Home",
    route: routes.dashboard.home(),
    icon: faHome,
  },
  {
    name: "Articles",
    route: routes.dashboard.articles.root(),
    icon: faFolder,
  },
  {
    name: "Projects",
    route: routes.dashboard.projects.root(),
    icon: faFolder,
  },
  {
    name: "Tags",
    route: routes.dashboard.tags(),
    icon: faFolder,
  },
  {
    name: "Tools",
    route: routes.dashboard.tools(),
    icon: faFolder,
  },
  {
    name: "Users",
    route: routes.dashboard.users(),
    icon: faUser,
  },
];

const navLinks2: NavLink[] = [
  {
    name: "Settings",
    route: routes.dashboard.settings.profile(),
    icon: faGear,
  },
];

interface NavItemProps {
  item: NavLink;
}

const NavItem = (props: NavItemProps) => {
  const { item } = props;
  return (
    <a
      className="w-full px-3 py-2 rounded-md font-medium hover:bg-accent"
      href={item.route}
    >
      {item.icon && <FontAwesomeIcon className="mr-2" icon={item.icon} />}
      <span>{item.name}</span>
    </a>
  );
};

export default function DashboardLayout() {
  return (
    <main className="min-h-screen flex">
      <aside className="max-w-xs w-full h-screen p-5 flex flex-col border-r border-border sticky top-0">
        <div className="h-14 flex items-center mb-3">
          <Logo />
        </div>
        <nav className="flex flex-col gap-y-2 flex-1">
          {navLinks.map((item, i) => (
            <NavItem key={i} item={item} />
          ))}
        </nav>
        <nav className="flex flex-col gap-y-2">
          {navLinks2.map((item, i) => (
            <NavItem key={i} item={item} />
          ))}
        </nav>
        <div className="my-3 h-[1px] bg-border" />
        <DashboardUserProfile />
      </aside>
      <div className="w-full px-10 py-5">
        <Outlet />
      </div>
    </main>
  );
}
