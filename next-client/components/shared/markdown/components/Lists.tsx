export const Ul = (props: any) => {
  const { node, ...other } = props;
  return <ul className="list-inside list-[square] mb-4 pl-10" {...other} />;
};

export const Ol = (props: any) => {
  const { node, ...other } = props;
  return <ol className="list-inside list-decimal mb-4 pl-10" {...other} />;
};

export const Li = (props: any) => {
  const { node, ...other } = props;
  return <li {...other} />;
};
