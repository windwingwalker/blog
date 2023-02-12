import { TimelineOppositeContent, TimelineDot, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent} from '@mui/lab';
import { Typography, Box } from '@mui/material';

interface Log {
  content: string,
  date: string,
  version?: string,
  isLast: boolean
}

export const SingleLog:React.FC<Log> = (log) => {
  return (
    <TimelineItem >
      <TimelineOppositeContent color="text.secondary" sx={{maxWidth: 127}}>
        <Typography>
          {log["date"]}
        </Typography>
        {log["version"] != null &&
          <Typography>
          【v{log["version"]}】
          </Typography> 
        }
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        {!log["isLast"] && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        {log["content"]}
      </TimelineContent>
    </TimelineItem>
  );
}