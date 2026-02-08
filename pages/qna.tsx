import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react';
import { QNA_PATH } from '../shared/constant';
import { useAuthValidation } from '../functions/useAuthValidation';
import { PageHeadingBlock } from '../components/textblock';
import { getJSONInJSObjectFromS3, useLargeScreen} from '../functions/common';
import { PageContainer } from '../components/root';
import { QABlock } from '../components/qna/root';

interface QnAItem {
  question: string;
  answer: string;
}

interface Props {
  data: QnAItem[];
}

const QnAPage: NextPage<Props> = ({data}) =>{
  useAuthValidation(QNA_PATH);

  const isLargeScreen = useLargeScreen();

  return (
    <PageContainer name="Q&A">
      {!isLargeScreen && <PageHeadingBlock navDisplayName="Q&A" />}
      {data.map(
        (item, index: number) => <QABlock key={index} index={index} question={item.question} answer={item.answer} />
      )}
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getJSONInJSObjectFromS3("blog/qna.json") as QnAItem[];
  
  return {
    props: {data},
  }
}

export default QnAPage;
