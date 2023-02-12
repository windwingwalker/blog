import { HeadingBlock } from "../textblock";

export const QABlock: React.FC<any> = ({index, question, answer}) => {
  const questionFullText = `Q${index+1}: ${question}`;
  const answerFullText = `A${index+1}: ${answer}`;
  return (
    <>
      <HeadingBlock size="h6" text={questionFullText} />
      <HeadingBlock size="h6" text={answerFullText} />
      <br />
    </>
  );
}