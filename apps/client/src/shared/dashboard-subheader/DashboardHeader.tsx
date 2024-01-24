interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function DashboardSubheader(props: DashboardHeaderProps) {
  const { title, subtitle, action } = props;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-x-10 mb-3">
        <div>
          <h1 className="text-lg font-medium mb-2">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="bg-border h-[1px]" />
    </div>
  );
}
