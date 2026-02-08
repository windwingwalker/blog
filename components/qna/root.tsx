import { HeadingBlock } from "../textblock";

interface QABlockProps {
  index: number;
  question: string;
  answer: string;
}

export const QABlock: React.FC<QABlockProps> = ({index, question, answer}) => {
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