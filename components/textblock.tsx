import parse from 'html-react-parser'
import { Grid, Link, Typography } from '@mui/material';
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

export const HeadingBlock: React.FC<any> = ({size, text, color="text.primary"}) => {
  return <Typography variant={size} component="div" color={color}>
    {parse(text)}
  </Typography>
}

export const ParagraphBlock: React.FC<any> = ({text}) =>
  <Typography variant="body1" color="text.primary">
    {parse(text)}
  </Typography>

export const PageHeadingBlock: React.FC<any> = ({size="h4", navDisplayName}) => {
  const res = PAGE_NAV_MAPPING.filter((item) => item.navDisplayName == navDisplayName)[0]

  return (
    <>
    <Grid container direction="row" alignItems="center" paddingX="8px">
      <Grid item>
        {res["icon"]} &nbsp;
      </Grid>
      <Grid item>
        <HeadingBlock size={size} text={res["pageHeadingDisplayName"]} />
      </Grid>
    </Grid>
    </>
  );
}

export const ArticleHeadingBlock: React.FC<any> = ({text, marker}) =>{
  var prefix = "";
  var n = +marker.charAt(1);
  for (var i = 0; i < n; i++){
    prefix += "&sect;"
  }

  return (
    <>
      <br />
      <Typography variant="h4" component="div" gutterBottom sx={{fontWeight: 'medium'}}>
        {parse(prefix + " " + "\n" + text)}
      </Typography>
    </>
  );
}

export const ArticleParagraphBlock: React.FC<any> = ({text}) =>{
  return (
    <>
      <Typography variant="body1" component="div" gutterBottom sx={{ fontSize: 25 }}>
        &para; {text}
      </Typography>
      <br />
    </>
  );
}

export const ArticlePoetryBlock: React.FC<any> = ({sentenceList}) => {
  return (
    sentenceList.map((sentence: any, index: number) => 
      <Typography key={index} variant='body1' component="div" align="center" sx={{ fontSize: 20 }} >
        {sentence}
      </Typography>
    )
  );
}

export const ArticleTitleBlock: React.FC<any> = ({text}) => {
  return (
    <Typography variant="h3" component="div" align="center" gutterBottom sx={{fontWeight: 'bold'}}> 
      {text}
    </Typography>
  );
}

export const ArticleSubtitleBlock: React.FC<any> = ({text}) => {
  return (
    <Typography variant="h4" component="div" align="center" gutterBottom sx={{fontWeight: 'medium'}}>
      {text}
    </Typography>
  );
}

export const ArticleVersionBlock: React.FC<any> = ({text}) => {
  return (
    <>
      <Typography variant="overline" component="div" align="center" gutterBottom color="text.secondary" sx={{fontWeight: 'medium'}}>
        {text}
      </Typography>
      <br />
    </>
  );
}