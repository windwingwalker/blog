import { Grid, Link, Typography, Box } from '@mui/material';
import parse from 'html-react-parser'

interface ArticleHeadingBlockProps {
  text: string;
  marker: string;
}

export const ArticleHeadingBlock: React.FC<ArticleHeadingBlockProps> = ({text, marker}) =>{
  let prefix = "";
  const n = +marker.charAt(1);
  for (let i = 0; i < n; i++){
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

interface ArticleParagraphBlockProps {
  text: string;
}

export const ArticleParagraphBlock: React.FC<ArticleParagraphBlockProps> = ({text}) =>{
  return (
    <>
      <Typography variant="body1" component="div" gutterBottom sx={{ fontSize: 20 }}>
        {text}
      </Typography>
      <br />
    </>
  );
}

interface ArticlePoetryBlockProps {
  sentenceList: string[];
}

export const ArticlePoetryBlock: React.FC<ArticlePoetryBlockProps> = ({sentenceList}) => {
  return (
    sentenceList.map((sentence, index: number) =>
      <Typography key={index} variant='body1' component="div" align="center" sx={{ fontSize: 20 }} >
        {parse(sentence)}
      </Typography>
    )
  );
}

interface ArticleTitleBlockProps {
  text: string;
}

export const ArticleTitleBlock: React.FC<ArticleTitleBlockProps> = ({text}) => {
  return (
    <Typography variant="h3" component="div" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
      {text}
    </Typography>
  );
}

interface ArticleSubtitleBlockProps {
  text: string;
}

export const ArticleSubtitleBlock: React.FC<ArticleSubtitleBlockProps> = ({text}) => {
  return (
    <Typography variant="h4" component="div" align="center" gutterBottom sx={{fontWeight: 'medium'}}>
      {text}
    </Typography>
  );
}

interface ArticleVersionBlockProps {
  text: string;
}

export const ArticleVersionBlock: React.FC<ArticleVersionBlockProps> = ({text}) => {
  return (
    <>
      <Typography variant="overline" component="div" align="center" gutterBottom color="text.secondary" sx={{fontWeight: 'medium'}}>
        {text}
      </Typography>
      <br />
    </>
  );
}