import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from 'axios';
import { ArticleCatalog, Article } from '../../models/article';
import { ARTICLES_PATH, ARTICLE_URL, ARTICLE_CATALOG_URL } from '../../shared/constant';
import { Typography, Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { updatePath } from '../../shared/pathSlice';
import { login, logout } from '../../shared/userSlice';
import { isGuest } from '../../functions/auth';
import { getDateFromUnix } from '../../functions/article';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

interface BlockProps{
  text: string
}

const ArticleHeadingBlock: React.FC<BlockProps> = ({text}) =>{
  return (
    <>
      <br />
      <Typography variant="h4" component="div" gutterBottom sx={{fontWeight: 'medium'}}>
        &sect; {text}
      </Typography>
    </>
  );
}

const ArticleParagraphBlock: React.FC<BlockProps> = ({text}) =>{
  return (
    <>
      <Typography variant="body1" component="div" gutterBottom sx={{ fontSize: 25 }}>
        &para; {text}
      </Typography>
      <br />
    </>
  );
}

const TitleBlock: React.FC<BlockProps> = ({text}) => {
  return (
    <Typography variant="h3" component="div" align="center" gutterBottom sx={{fontWeight: 'bold'}}> 
      {text}
    </Typography>
  );
}

const SubtitleBlock: React.FC<BlockProps> = ({text}) => {
  return (
    <Typography variant="h4" component="div" align="center" gutterBottom sx={{fontWeight: 'medium'}}>
      {text}
    </Typography>
  );
}

const VersionBlock: React.FC<BlockProps> = ({text}) => {
  return (
    <>
      <Typography variant="overline" component="div" align="center" gutterBottom color="text.secondary" sx={{fontWeight: 'medium'}}>
        {text}
      </Typography>
      <br />
    </>
  );
}

interface Props{
  article: Article
}

const ArticlePage: NextPage<Props> = ({article}) => {
  const dispatch = useAppDispatch();
  const role: string = useAppSelector((state: any) => state.user.role)
  
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(ARTICLES_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
      if (process.env.NODE_ENV == "production" && role != "admin"){
        const res = await axios.get(`/api/article-reader-count?firstPublished=${article["firstPublished"]}`);
      }
    }

    validateRole(); 
  }, [role]);
  
  return (
    <Box padding={2}>
    <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}>
      <Grid item xs sm md lg xl>
      </Grid>
      <Grid item sx={{maxWidth: 700}} >
        <TitleBlock text={article["title"]} />
        <SubtitleBlock text={article["subtitle"]} />
        <VersionBlock text={`First Published: ${getDateFromUnix(article["firstPublished"])} | Last Modified: ${getDateFromUnix(article["lastModified"])} | Edition: ${article["edition"]}`} />
        <hr />
        {article["body"].map((block, index) => {
          var markers = Object.keys(block);
          var marker = markers[0];
          if (marker == "p")
            return <ArticleParagraphBlock key={index} text={block[marker]} />
          else
            return <ArticleHeadingBlock key={index} text={block[marker]} />
        })}
      </Grid>
      <Grid item xs sm md lg xl>
      </Grid>

      </Grid>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const res = await axios.get(`${ARTICLE_URL}?firstPublished=${params["firstPublished"]}`);
  const article: Article = res["data"] as Article;

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(ARTICLE_CATALOG_URL);
  const articleCatalog: ArticleCatalog = res["data"] as ArticleCatalog;
  
  const paths = articleCatalog["body"].map(articleMetadata => ({
    params: { firstPublished: articleMetadata["firstPublished"].toString() },
  }))

  return {
    paths: paths,
    fallback: false
  }
}

export default ArticlePage;