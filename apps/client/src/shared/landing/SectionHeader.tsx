interface SectionHeaderProps {
  children?: React.ReactNode;
}

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <h5 className="text-secondary-foreground text-3xl font-medium mb-5">
      {props.children}
    </h5>
  );
}
