import '../styles/globals.css';
import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import MyDrawer from '../components/nav/drawer';
import MyAppBar from '../components/appbar';
import Router from 'next/router';
import nProgress from 'nprogress';
import "../styles/nprogress.css";
import theme from "../shared/theme";
import { Provider } from "react-redux";
import store from "../shared/store";
import Head from 'next/head'
import MySpeedDial from '../components/nav/speedDial';
import { SAND } from '../shared/constant';
import { useLargeScreen, useMiddleScreen, useSmallScreen } from '../functions/common';

Router.events.on('routeChangeStart', () => nProgress.start()); 
Router.events.on('routeChangeComplete', () => nProgress.done()); 
Router.events.on('routeChangeError', () => nProgress.done());

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = React.useState(true);
  const isLargeScreen = useLargeScreen();
  const isSmallScreen = useSmallScreen();
  const isMiddleScreen = useMiddleScreen();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = () => setOpen(!open);

  const Main = styled(Box)(({ theme }) => ({
    backgroundColor: SAND,
    flexGrow: 1,
    padding: isSmallScreen ? 0 : 2,
    minHeight: "100vh",
    // ["@media (min-width:0px) and (orientation: landscape)"]: { minHeight: `calc(100% - 48px)` },
    // ["@media (min-width:600px)"]: {minHeight: `calc(100% - 64px)`},
  }));

  return (
    <>
      <Head>
        <title>Elliot Kam&apos;s Blog</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}> 
          <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            {mounted && isLargeScreen && (
              <MyAppBar open={open} toggleDrawer={toggleDrawer} />
            )}
            {mounted && isLargeScreen && (
              <MyDrawer open={open} toggleDrawer={toggleDrawer} />
            )}
            <Main component="main">
              <DrawerHeader />
              <Component {...pageProps} />
              {isMiddleScreen && <MySpeedDial />}
            </Main>
          </Box>
        </Provider>
      </ThemeProvider>
    </>
  );
}

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <CssBaseline />
//       <Box className='root-flex-container'>
//         <Box className='row-flex-item' sx={{width: 240}}>
//           <Drawer />
//         </Box>
//         <Box className='row-flex-item' sx={{flex: 1}}>
//           <Box className='column-flex-container'>
//             <Box className='column-flex-item' sx={{height: 64, background: "blue"}}>
//               <AppBar/>
//             </Box>
//             <Box className='column-flex-item' sx={{flex: 1, background: "green"}}>
//               <Box
//                 component="main"
//                 sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//               >
//                 {/* <Toolbar /> */}
//                 <Component {...pageProps} />
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

