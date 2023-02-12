import type { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react';
import { CHANGE_LOG_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch } from '../shared/hooks';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import { default as MuiTimeline} from '@mui/lab/Timeline';
import { PageHeadingBlock } from '../components/textblock';
import { isLargeScreen } from '../functions/common';
import { SingleLog } from '../components/changelog/root';
import { PageContainer } from '../components/root';
import data from '../data/changelog.json'

const ChangelogPage: NextPage<any> = () =>{
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(CHANGE_LOG_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole(); 
  });

  return (
    <PageContainer name="Changelog" >
      {!isLargeScreen() && <PageHeadingBlock navDisplayName="Changelog" />}
      <MuiTimeline sx={{paddingX: 0, paddingTop: 0, marginTop: 0}}>
      {data.map((log: any, index: number) => (
        (index == data.length - 1)
        ? <SingleLog key={index} content={log["content"]} date={log["date"]} version={log["version"]} isLast={true}/> 
        : <SingleLog key={index} content={log["content"]} date={log["date"]} version={log["version"]} isLast={false}/> 
      ))}
      </MuiTimeline>
    </PageContainer>
  );
}

export default ChangelogPage;