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
import { useSmallScreen } from '../functions/common';

const LoginPage: NextPage = () => {

  /**
   * We need this box to define the height
   */
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

  const isSmallScreen = useSmallScreen();
  const paddingX = isSmallScreen ? 1 : 5;

  return (
    <MyBox paddingX={paddingX}>
      <Grid container minHeight="100%" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid size={{xs: 12, sm: 8, md: 8, lg: 8, xl: 8}}>
          <LoginAnnouncement />
        </Grid>
        <Grid display="flex" justifyContent="center" alignItems="center" size={{xs: 12, sm: 4, md: 4, lg: 4, xl: 4}}>
          <Form />
        </Grid>
      </Grid>
    </MyBox>
  )
}

export default LoginPage;
