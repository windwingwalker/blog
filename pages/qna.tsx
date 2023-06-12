import type { GetStaticProps, NextPage } from 'next'
import { useState, useEffect } from 'react';
import { QNA_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch } from '../shared/hooks';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import { PageHeadingBlock } from '../components/textblock';
import { getJSONInJSObjectFromS3, isLargeScreen} from '../functions/common';
import { PageContainer } from '../components/root';
import { QABlock } from '../components/qna/root';

const QnAPage: NextPage<any> = ({data}) =>{
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(QNA_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole(); 
  });

  return (
    <PageContainer name="Q&A">
      {!isLargeScreen() && <PageHeadingBlock navDisplayName="Q&A" />}      
      {data.map(
        (item: any, index: number) => <QABlock key={index} index={index} question={item["question"]} answer={item["answer"]} />
      )}
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data: Object[] = await getJSONInJSObjectFromS3("blog/qna.json");
  
  return {
    props: {data},
  }
}

export default QnAPage;