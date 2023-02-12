import { Typography, Paper, Divider, Box, Grid } from '@mui/material';
import { HeadingBlock, ListBlock, PageHeadingBlock, ParagraphBlock } from '../textblock';

const CARD_BACKGROUND_COLOR = "#FFFAF0"
const TITLE_COLOR = "#B8860B"

export const Description:React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}>
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <ParagraphBlock text={data["body"]} />
    </Paper>
  );
}

export const WorkExperience: React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}> 
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <Typography variant="body1" component="div" gutterBottom color="jadeite.main">
        {data["body"][0]["h"]}
      </Typography>
      <ListBlock list={data["body"][0]["body"]} />     
       
      <Divider variant="middle" sx={{backgroundColor: "sand.main"}}/>
      <br />

      <Typography variant="body1" component="div" gutterBottom color="jadeite.main">
        {data["body"][1]["h"]}
      </Typography>
      <ListBlock list={data["body"][1]["body"]} />

      <Divider variant="middle" sx={{backgroundColor: "sand.main"}}/>
      <br />

      <Typography variant="body1" component="div" gutterBottom color="jadeite.main">
        {data["body"][2]["h"]}
      </Typography>
      <ListBlock list={data["body"][2]["body"]} />
    </Paper>
  );
}

export const AcademicBackground: React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}>
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <ListBlock list={data["body"]} />
    </Paper>
  );
}

export const Events: React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}>
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <ListBlock list={data["body"]} />
    </Paper>
  );
}

export const Cert: React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}>
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <ListBlock list={data["body"]} />
    </Paper>
  );
}

export const SkillSet: React.FC<any> = ({data}: any) => {
  return (
    <Paper sx={{padding: "10px", bgcolor: CARD_BACKGROUND_COLOR}}>
      <HeadingBlock size="h5" text={data["h1"]} color={TITLE_COLOR}/>
      <ParagraphBlock text="(&#9989; Means the technology has been applied in the creation of this website" />
      <ListBlock list={data["body"]} />
    </Paper>
  );
}