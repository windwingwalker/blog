import type { NextPage } from 'next'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import { useAppDispatch } from '../shared/hooks';
import { updatePath } from '../shared/pathSlice';
import { LOGIN_PATH } from '../shared/constant';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import  Form from '../components/login/form'
import LoginAnnouncement from '../components/login/announcement';
import { Center } from '../components/root';
import { isSmallScreen } from '../functions/common';

const LoginPage: NextPage<any> = () => {
  const MyBox = styled(Box)(({ theme }) => ({
    height: `calc(100% - 56px)`,
    ["@media (min-width:0px) and (orientation: landscape)"]: { height: `calc(100% - 48px)` },
    ["@media (min-width:600px)"]: {height: `calc(100% - 64px)`},
  }));

  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(LOGIN_PATH)); 
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole();
  });

  const paddingX = isSmallScreen() ? 1 : 5;

  return (
    <MyBox paddingX={paddingX}>
      <Center>
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <Center>
              <LoginAnnouncement />
            </Center> 
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Center>
              <Form />
            </Center>
          </Grid>
        </Grid>
      </Center>
    </MyBox>
  );
}

export default LoginPage;