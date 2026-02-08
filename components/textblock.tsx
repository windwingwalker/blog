import parse from 'html-react-parser'
import { Grid, Link, Typography, Box } from '@mui/material';
import { PAGE_NAV_MAPPING } from '../shared/constant';

type ListElement = string | { h: string; body: ListElement[] };

interface ListBlockProps {
  list: ListElement[];
}

export const ListBlock: React.FC<ListBlockProps> = ({list}) =>
  <ul>
    {list.map((element, index: number) => typeof element === 'string' ?
      <li key={index}><ParagraphBlock text={element} /></li> :
      <li key={index}><ParagraphBlock text={element.h} />
        <ListBlock list={element.body} />
      </li>
    )}
  </ul>

interface HyperLinkSpanProps {
  text: string;
  link: string;
}

export const HyperLinkSpan: React.FC<HyperLinkSpanProps> = ({text, link}) =>
  <Link color="jadeite.main" href={link}>
    {parse(text)}
  </Link>

interface HeadingBlockProps {
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
  color?: string;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({size, text, color="text.primary"}) =>
  <Typography variant={size} component="div" color={color}>
    {parse(text)}
  </Typography>

interface ParagraphBlockProps {
  text: string;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({text}) =>
  <Typography variant="body1" color="text.primary">
    {parse(text)}
  </Typography>

interface PageHeadingBlockProps {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  navDisplayName: string;
}

export const PageHeadingBlock: React.FC<PageHeadingBlockProps> = ({size="h4", navDisplayName}) => {
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