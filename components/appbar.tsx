import { styled } from '@mui/material/styles';
import { Box, Typography, Toolbar} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import type { AppProps } from 'next/app'
import { DRAWER_WIDTH } from '../shared/constant';

interface Props {
  open: boolean,
  toggleDrawer: Function
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const MyAppBar:React.FC<Props> = ({open, toggleDrawer}) => {

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

    return (
      <AppBar position="fixed" open={open} sx={{backgroundColor: "#f4eddf"}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer()}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: "jadeite.main" }} fontSize="large" />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="bold" sx={{color: "jadeite.main"}}>
            Knowledge {bull} Rationality {bull} Action {bull} Progress
          </Typography>
        </Toolbar>
      </AppBar>
    );
} 

export default MyAppBar;