import * as React from 'react';
import { default as MuiTimeline } from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

interface Event {
  name: string,
  date: string,
  color: any
}

const SingleEvent:React.FC<Event> = (event: Event) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary" sx={{maxWidth: 105}}>
        {event.date}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot variant="outlined" color={event.color}/>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {event.name}
      </TimelineContent>
    </TimelineItem>
  );
}

const Timeline:React.FC<any> = ({data}) => {
  return (
    <>
      <MuiTimeline>
          {data.map((event: Event, index: number) => (
              <SingleEvent key={index} name={event.name} date={event.date} color={event.color}/> 
          ))}
      </MuiTimeline>
    </>
  );
}

export default Timeline;