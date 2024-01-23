export const H1 = (props: any) => {
  const { node, ...other } = props;
  return <h1 className="text-[2.5rem] font-medium mb-2 pt-5" {...other} />;
};

export const H2 = (props: any) => {
  const { node, ...other } = props;
  return <h2 className="text-[2rem] font-medium mb-2 pt-5" {...other} />;
};

export const H3 = (props: any) => {
  const { node, ...other } = props;
  return <h3 className="text-[1.75rem] font-medium mb-2 pt-5" {...other} />;
};

export const H4 = (props: any) => {
  const { node, ...other } = props;
  return <h4 className="text-[1.5rem] font-medium mb-2 pt-5" {...other} />;
};

export const H5 = (props: any) => {
  const { node, ...other } = props;
  return <h5 className="text-[1.25rem] font-medium mb-2 pt-5" {...other} />;
};

export const H6 = (props: any) => {
  const { node, ...other } = props;
  return <h6 className="text-[1rem] font-medium mb-2 pt-5" {...other} />;
};
