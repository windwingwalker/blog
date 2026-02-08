import type { NextPage } from 'next'
import { CHANGE_LOG_PATH } from '../shared/constant';
import { useAuthValidation } from '../functions/useAuthValidation';
import { default as MuiTimeline} from '@mui/lab/Timeline';
import { PageHeadingBlock } from '../components/textblock';
import { useLargeScreen } from '../functions/common';
import { SingleLog } from '../components/changelog/root';
import { PageContainer } from '../components/root';
import data from '../data/changelog.json'

interface ChangelogItem {
  content: string;
  date: string;
  version?: string;
}

const ChangelogPage: NextPage = () =>{
  useAuthValidation(CHANGE_LOG_PATH);

  const isLargeScreen = useLargeScreen();

  return (
    <PageContainer name="Changelog" >
      {!isLargeScreen && <PageHeadingBlock navDisplayName="Changelog" />}
      <MuiTimeline sx={{paddingX: 0, paddingTop: 0, marginTop: 0}}>
      {(data as ChangelogItem[]).map((log, index: number) => (
        (index == data.length - 1)
        ? <SingleLog key={index} content={log.content} date={log.date} version={log.version} isLast={true}/>
        : <SingleLog key={index} content={log.content} date={log.date} version={log.version} isLast={false}/> 
      ))}
      </MuiTimeline>
    </PageContainer>
  );
}

export default ChangelogPage;
