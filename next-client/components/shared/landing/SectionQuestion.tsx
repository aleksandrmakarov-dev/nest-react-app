interface SectionQuestionProps {
  children?: React.ReactNode;
}

export function SectionQuestion(props: SectionQuestionProps) {
  return <p className="text-primary font-medium mb-3">{props.children}</p>;
}
