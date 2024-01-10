export const P = (props: any) => {
  const { node, ...other } = props;
  return <p className="mb-4 text-foreground-primary" {...other} />;
};
