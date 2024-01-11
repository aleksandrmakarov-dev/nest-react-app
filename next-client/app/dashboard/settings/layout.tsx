import { NavigationTab } from "@/components/shared/ui/navigation-tabs";
import { NavLink, routes } from "@/lib/routing";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: "Profile",
    route: routes.dashboard.settings.profile(),
  },
  {
    name: "Password",
    route: routes.dashboard.settings.profile(),
  },
  {
    name: "Notifications",
    route: routes.dashboard.settings.profile(),
  },
];

export default function SettingsLayout(props: SettingsLayoutProps) {
  const { children } = props;

  return (
    <div>
      <div className="h-14 flex items-center mb-3">
        <h1 className="text-3xl font-medium block">Settings</h1>
      </div>
      <div className="mb-3 bg-muted border-border border p-1 rounded-md flex flex-wrap gap-x-1.5">
        {navLinks.map((item, i) => (
          <NavigationTab key={i} data-state="active" href={item.route}>
            {item.name}
          </NavigationTab>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
