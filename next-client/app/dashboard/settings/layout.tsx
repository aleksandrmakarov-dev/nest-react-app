import { DashboardHeader } from "@/components/shared";
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
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account settings"
      />
      <div>{children}</div>
    </div>
  );
}
