interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { title, subtitle, action } = props;

  return (
    <div className="mb-5 flex items-center justify-between gap-x-10">
      <div>
        <h1 className="text-3xl font-medium">{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
