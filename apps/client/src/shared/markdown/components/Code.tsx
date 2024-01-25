import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Code = (props: any) => {
  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <div className="p-5 border border-border rounded-md mb-4">
      <SyntaxHighlighter
        {...rest}
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        style={vs}
        customStyle={{
          margin: 0,
          border: 0,
          padding: 0,
          background: "none",
        }}
      />
    </div>
  ) : (
    <code
      {...rest}
      className="rounded-sm px-1 py-[1px] bg-accent text-accent-foreground"
    >
      {children}
    </code>
  );
};
