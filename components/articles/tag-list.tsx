import Paper from '@mui/material/Paper';
import { ArticleTag } from '../../models/article';
import { Box, Chip } from '@mui/material';
import { addTagFilter, setCurrentPage } from '../../shared/articleSlice';
import { useAppDispatch } from '../../shared/hooks';
import data from '../../data/tags.json'

export const Tag: React.FC<{articleTag: ArticleTag}> = ({articleTag}) => {
  const dispatch = useAppDispatch();

  return (
    <Box component="span" sx={{margin: "3px"}} >
      <Chip
        label={articleTag["name"]}
        color={articleTag["color"]}
        variant="outlined"
        sx={{marginBottom: "8px"}}
        onClick={() => {
          console.log(articleTag["id"])
          dispatch(addTagFilter(articleTag["id"]));
          dispatch(setCurrentPage(1));
        }}
      />
    </Box>
  );
}

export const TagList: React.FC<any> = () => {
    return (
      <>
      <Paper>
        {/* <Typography variant="subtitle1" component="div">Filter by Tag</Typography> */}
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {data.map((data: ArticleTag, index: number) => (
              <Tag key={index} articleTag={data} />
          )
          )}
        </Paper>
      </Paper>
      </>
    );
}