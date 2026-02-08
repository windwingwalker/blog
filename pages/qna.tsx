import type { GetStaticProps, NextPage } from 'next'
import { useState, useEffect } from 'react';
import { QNA_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch } from '../shared/hooks';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(QNA_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole(); 
  });

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
