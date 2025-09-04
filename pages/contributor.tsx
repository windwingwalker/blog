import type { GetStaticProps, NextPage } from 'next'
import { Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { CONTRIBUTOR_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch } from '../shared/hooks';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import { Center, PageContainer } from '../components/root';
import { HeadingBlock, ListBlock, PageHeadingBlock } from '../components/textblock';
import { getJSONInJSObjectFromS3, useLargeScreen } from '../functions/common';

const ContributorPage: NextPage<any> = ({data}) =>{
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(CONTRIBUTOR_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole();
  });

  const videoRatio = 500 / 294
  const videoWidth = 600
  const videoHeight = videoWidth / videoRatio
  const isLargeScreen = useLargeScreen();

  return (
    <PageContainer name="Contributors">
      <Grid container>
        {!isLargeScreen && <PageHeadingBlock navDisplayName="Contributors" />}
        <Grid justifyContent="center" alignItems="center" size={{xs: 12, sm: 12, md: 6, lg: 6, xl: 6}}> 
            <HeadingBlock size="h5" text="Thanks the following people contribute to this site" />
            <ListBlock list={data[0]}/>
        </Grid>
        
        <Grid size={{xs: 12, sm: 12, md: 6, lg: 6, xl: 6}}>
            <HeadingBlock size="h5" text="Also thanks this song supporting me!" />
            <HeadingBlock size="h6" text="林家謙 Terence Lam 《一人之境》 Solitude (Official Video)" />
            <Box sx={{ width: '100%'}}>
              <iframe width="100%" height={videoHeight} src="https://www.youtube.com/embed/qWhavDVsMRc" />              
            </Box>
            <ListBlock list={data[1]} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data: Object[] = await getJSONInJSObjectFromS3("blog/contributor.json");
  
  return {
    props: {data},
  }
}

export default ContributorPage;
