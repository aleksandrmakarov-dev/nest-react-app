export const Blockquote = (props: any) => {
  const { node, ...other } = props;
  return (
    <blockquote
      className="bg-gray-100 border-l-4 border-gray-400 mx-3 my-5 p-2"
      {...other}
    />
  );
};
