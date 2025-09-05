import type { NextPage } from 'next'
import axios from 'axios';
import { Grid, Stack, Button } from '@mui/material';
import { TagList } from '../../components/articles/tag-list';
import History from '../../components/articles/history';
import { ArticleCatalog, ArticleMetadata, ArticleTag } from '../../models/article';
import { ArticleCardList } from '../../components/articles/articleCard';
import { GetStaticProps } from 'next';
import { ARTICLES_PATH, ARTICLE_CATALOG_URL } from '../../shared/constant';
import { useState, useEffect } from 'react';
import { updatePath } from '../../shared/pathSlice';
import { login, logout } from '../../shared/userSlice';
import { resetAllFilter } from '../../shared/articleSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { isGuest } from '../../functions/auth';
import { useRouter } from "next/router";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { filterArticlesByTags, getArticlesOfCurrentPage, getMaxPageNumber } from '../../functions/article';
import MyPagination from '../../components/articles/pagination';
import { PageHeadingBlock } from '../../components/textblock';
import { PageContainer } from '../../components/root';
import { getJSONInJSObjectFromS3 } from '../../functions/common';

const ARTICLE_AMOUNT_PER_PAGE : number = 7;

interface Props{
  articleCatalog: ArticleCatalog,
  tags: ArticleTag[]
}

const ArticleListPage: NextPage<Props> = ({articleCatalog, tags}) => {
  const dispatch = useAppDispatch();
  const tagSelected: string[] = useAppSelector((state: any) => state.article.tags)
  const seriesSelected: string = useAppSelector((state: any) => state.article.series)
  const currentPage: number = useAppSelector((state: any) => state.article.currentPage)
  const [maxPageNumber, setMaxPageNumber] = useState(1);

  const router = useRouter();
  const [articlesOfCurrentPage, setArticlesOfCurrentPage] = useState<ArticleMetadata[]>([]);

  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(ARTICLES_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }

    if(!router.isReady) return;
    // const query = router.query;
    // var currentPage: number = 1
    // if (query["page"] != null) currentPage = +query["page"]
    // if (currentPage <= 0 || currentPage > maxPage) setValidPage(false)
    // setCurrentPage(currentPage)

    var targetedArticleMetadata: ArticleMetadata[] = articleCatalog["body"]
    targetedArticleMetadata = filterArticlesByTags(targetedArticleMetadata, tagSelected)
    setMaxPageNumber(getMaxPageNumber(targetedArticleMetadata.length, ARTICLE_AMOUNT_PER_PAGE));
    targetedArticleMetadata = getArticlesOfCurrentPage(targetedArticleMetadata, currentPage, ARTICLE_AMOUNT_PER_PAGE)
    setArticlesOfCurrentPage(targetedArticleMetadata)
    validateRole();
    
  }, [router.isReady, tagSelected, seriesSelected, currentPage, maxPageNumber]);

  return (
    <PageContainer name="Articles">
      <PageHeadingBlock size="h4" navDisplayName="Articles" />
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <h1>Featured Articles</h1>
          <FeaturedArticleList />
        </Grid> */}
        
        <Grid size={{xs: 12, sm: 8, md: 8, lg: 8, xl: 8}}>
          <ArticleCardList value={articlesOfCurrentPage} tags={tags}/>
          <br />
          <MyPagination maxPage={maxPageNumber} currentPage={currentPage} />
        </Grid>

        <Grid size={{xs: 0, sm: 4, md: 4, lg: 4, xl: 4}}>
          <Stack spacing={2}>
            <TagList tags={tags}/>
            <Button variant="outlined" color='jadeite' startIcon={<AutorenewOutlinedIcon />} onClick={() => dispatch(resetAllFilter())}>Reset all Filter</Button>
            {/* <History /> */}
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articleCatalogResponse = await axios.get(ARTICLE_CATALOG_URL);
  const articleCatalog: ArticleCatalog = articleCatalogResponse["data"];

  const tags: ArticleTag[] = await getJSONInJSObjectFromS3("article/tags.json");
  
  return {
    props: {
      articleCatalog,
      tags
    },
  }
}

// export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
//   const res = await axios.get(ARTICLE_INDEX_URL);
//   const articleIndex: ArticleIndex = res["data"];
 
//   const pageMax = Math.floor(articleIndex["count"] / 10) + 1
//   if (page <= 0 || page > pageMax) return {notFound: true};

//   const index: number = +page - 1;
//   const articlesOfCurrentPage = articleIndex["body"][index];

//   return {
//     props: {
//       articlesOfCurrentPage,
//       pageMax
//     },
//   }
// }

export default ArticleListPage;