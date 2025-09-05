import { ArticleMetadata, ArticleTag } from '../../models/article';
import NextLink from 'next/link';
import { ARTICLES_PATH } from '../../shared/constant';
import { Tag } from './tag-list'
import { HeadingBlock } from '../textblock';
import { getDateFromUnix } from '../../functions/article';
import { useSmallScreen } from '../../functions/common';
import { Stack, Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';

interface Props {
  articleMetadata: ArticleMetadata,
  tags: ArticleTag[]
}

// const FeaturedArticleList: React.FC = () => {
//     return (
//         <Stack direction="row" spacing={2} sx={{maxWidth: "85vw", overflowY: "scroll"}} >
        
//             {articles.filter(article => article.featured).map((article: Article, index: number) => (
//             <FeaturedArticleCard key={index} id={article.id} title={article.title} featured={article.featured} content={article.content}/>
//             ))}
//         </Stack>
//     );
// }

export const ArticleCardList: React.FC<any> = ({value, tags}: any) => {
  return (
    <Stack spacing={2} >
      {value.map((articleMetadata: ArticleMetadata, index: number) => 
        <ArticleCard key={index} articleMetadata={articleMetadata} tags={tags}/>      
      )}
    </Stack>
  );
}

const FeaturedArticleCard: React.FC<Props> = ({articleMetadata}) => {
  return (
    <Card sx={{ minWidth: 350}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {articleMetadata["title"]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none', 
      }}>
        </Box>
      </CardContent>
    </Card>
  );
}

const ArticleCard: React.FC<Props> = ({articleMetadata, tags}) => {
  const isSmallScreen = useSmallScreen();

  const paddingX = isSmallScreen ? 1 : 3;
  const paddingTop = isSmallScreen ? 2 : 3;
  const paddingBottom = isSmallScreen ? 1 : 2;

  return (
    <Card sx={{ minWidth: 275}} >
      <CardActionArea 
        component={NextLink}
        href={`${ARTICLES_PATH}/${articleMetadata["firstPublished"]}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent sx={{paddingX: paddingX, paddingTop: paddingTop, paddingBottom: paddingBottom}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            First Published: {getDateFromUnix(articleMetadata["firstPublished"], -5)} | Last Modified: {getDateFromUnix(articleMetadata["lastModified"], -5)} | Edition: {articleMetadata["edition"]}
          </Typography>
          {
            (articleMetadata["series"] != null && articleMetadata["series"] != "-")  && 
            <HeadingBlock size="h6" text={`《${articleMetadata["series"]}》系列`} />
          }
          <HeadingBlock size="h4" text={`【${articleMetadata["type"]}】${articleMetadata["title"]}`} />
          {
            (articleMetadata["subtitle"] != null && articleMetadata["subtitle"] != "-")  && 
            <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
              {articleMetadata["subtitle"]}
            </Typography>
          }
          {
            articleMetadata["tags"] != null && articleMetadata["tags"].map((tagName: string, index) => {
              var foo = tags.filter((data: ArticleTag) => data["id"] == tagName)[0]
              return <Tag key={index} articleTag={foo}/>
            })
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
