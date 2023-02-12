import * as React from 'react';
import Divider from '@mui/material/Divider';
import { ListItemText, ListItemButton, ListItemIcon, List} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import DrawerItem from './drawerItem';
import { logout } from '../../shared/userSlice';
import { removeCookies } from '../../functions/auth'
import { PAGE_NAV_MAPPING } from '../../shared/constant';
import { useRouter } from 'next/router';

const DrawerItemList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const currentRole = useAppSelector(state => state.user.role);
  const navItemList = PAGE_NAV_MAPPING.filter((item) => item.visibility == currentRole || item.visibility == "both")
  // const router = useRouter()

  // const handleClick = (path: string) => {
  //   router.push(path);
  // }

  return (
    <List sx={{backgroundColor: "carbon.main", height: "100%"}}>
      {navItemList.map((item) => {
        if (item["navDisplayName"] == "Articles" || item["navDisplayName"] == "Login" || item["navDisplayName"] == "Dashboard"){
          return(
            <>
              <DrawerItem key={item["navDisplayName"]} name={item["navDisplayName"]} icon={item["icon"]} path={item["path"]} />
              <Divider variant="middle" sx={{backgroundColor: "sand.main"}}/>
            </>
          );
        }else if(item["navDisplayName"] == "Logout"){
          return <DrawerItem key={item["navDisplayName"]} name={item["navDisplayName"]} icon={item["icon"]} path={item["path"]} action={() => dispatch(logout())}/>
        }else {
          return <DrawerItem key={item["navDisplayName"]} name={item["navDisplayName"]} icon={item["icon"]} path={item["path"]} />
        }
      })}
    </List>
  );
}

export default DrawerItemList;