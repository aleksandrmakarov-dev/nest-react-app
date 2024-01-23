export const A = (props: any) => {
  const { node, ...other } = props;
  return (
    <a
      className="text-primary-600 hover:text-primary-800 underline"
      {...other}
    />
  );
};
