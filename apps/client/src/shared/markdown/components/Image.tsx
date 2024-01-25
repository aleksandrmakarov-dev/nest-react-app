export const Image = (props: any) => {
  const { node, ...other } = props;

  return (
    <a className="mb-4 block" target="_blank" href={props.src}>
      <img className="object-center object-cover mx-auto max-w-xl" {...other} />
      {other.alt && (
        <span className="text-center text-foreground-secondary block">
          {other.alt}
        </span>
      )}
    </a>
  );
};
