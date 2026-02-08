import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths} from 'next'
import axios from 'axios';
import { ArticleCatalog, Article } from '../../models/article';
import { ARTICLES_PATH, ARTICLE_URL, ARTICLE_CATALOG_URL } from '../../shared/constant';
import { Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { updatePath } from '../../shared/pathSlice';
import { login, logout } from '../../shared/userSlice';
import { isGuest } from '../../functions/auth';
import { getDateFromUnix } from '../../functions/article';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ArticleHeadingBlock, ArticleParagraphBlock, ArticlePoetryBlock, ArticleSubtitleBlock, ArticleTitleBlock, ArticleVersionBlock } from '../../components/articles/articleTextBlock';

interface Props{
  article: Article
}

const ArticlePage: NextPage<Props> = ({article}) => {
  const dispatch = useAppDispatch();
  const role: string = useAppSelector(state => state.user.role)
  
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
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid sx={{maxWidth: 700}} >
          <ArticleTitleBlock text={article["title"]} />
          {
            (article["subtitle"] != null && article["subtitle"] != "-") && 
            <ArticleSubtitleBlock text={article["subtitle"]} />
          }
          <ArticleVersionBlock text={`First Published: ${getDateFromUnix(article["firstPublished"], -5)} | Last Modified: ${getDateFromUnix(article["lastModified"], -5)} | Edition: ${article["edition"]}`} />
          <hr />
          {article["body"].map((block, index) => {
            const markers = Object.keys(block);
            const marker = markers[0];
            const content = block[marker];

            if (marker == "p")
              return <ArticleParagraphBlock key={index} text={content as string} />
            else if (marker == "poetry")
              return <ArticlePoetryBlock key={index} sentenceList={content as string[]} />
            else
              return <ArticleHeadingBlock key={index} text={content as string} marker={marker} />
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const params = context.params as { firstPublished: string };
  const res = await axios.get(`${ARTICLE_URL}?firstPublished=${params.firstPublished}`);
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