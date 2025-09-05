import { Grid, Link, Typography, Box } from '@mui/material';
import parse from 'html-react-parser'


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
      <Typography variant="body1" component="div" gutterBottom sx={{ fontSize: 20 }}>
        {text}
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