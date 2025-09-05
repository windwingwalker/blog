import parse from 'html-react-parser'
import { Grid, Link, Typography, Box } from '@mui/material';
import { PAGE_NAV_MAPPING } from '../shared/constant';

export const ListBlock: React.FC<any> = ({list}: any) => 
  <ul>
    {list.map((element: any, index: number) => typeof element === 'string' ? 
      <li key={index}><ParagraphBlock text={element} /></li> : 
      <li key={index}><ParagraphBlock text={element["h"]} /> 
        <ListBlock list={element["body"]} />
      </li>
    )}
  </ul>

export const HyperLinkSpan: React.FC<any> = ({text, link}) => 
  <Link color="jadeite.main" href={link}>
    {parse(text)}
  </Link>

export const HeadingBlock: React.FC<any> = ({size, text, color="text.primary"}) => 
  <Typography variant={size} component="div" color={color}>
    {parse(text)}
  </Typography>


export const ParagraphBlock: React.FC<any> = ({text}) =>
  <Typography variant="body1" color="text.primary">
    {parse(text)}
  </Typography>

export const PageHeadingBlock: React.FC<any> = ({size="h4", navDisplayName}) => {
  const res = PAGE_NAV_MAPPING.filter((item) => item.navDisplayName == navDisplayName)[0]

  return (
    <>
    <Grid container direction="row" alignItems="center" paddingX="8px">
      <Box>
        {res["icon"]} &nbsp;
      </Box>
      <Box>
        <HeadingBlock size={size} text={res["pageHeadingDisplayName"]} />
      </Box>
    </Grid>
    </>
  );
}