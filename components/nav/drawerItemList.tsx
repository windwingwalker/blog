import * as React from 'react';
import Divider from '@mui/material/Divider';
import { List} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import DrawerItem from './drawerItem';
import { logout } from '../../shared/userSlice';
import { PAGE_NAV_MAPPING } from '../../shared/constant';

const DrawerItemList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const currentRole = useAppSelector(state => state.user.role);
  const navItemList = PAGE_NAV_MAPPING.filter((item) => item.visibility == currentRole || item.visibility == "both")

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