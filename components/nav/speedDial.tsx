import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import NavigationTwoToneIcon from '@mui/icons-material/NavigationTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Link from 'next/link';
import { useRouter } from 'next/router'
// import { guestNavItemList } from './navItemList';
import { PAGE_NAV_MAPPING } from '../../shared/constant';

const MySpeedDial: React.FC<{}> = () => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path);
  }

  return (
    <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16,  }}
        FabProps={{color: "jadeite"}}
        icon={<SpeedDialIcon icon={<NavigationTwoToneIcon sx={{color: "#f4eddf"}}/>} openIcon={<CloseTwoToneIcon sx={{color: "#f4eddf"}}/>}/>}
      >
        {PAGE_NAV_MAPPING.filter((item) => item.visibility == "guest" || item.visibility == "both").map((item) => (
            <SpeedDialAction
              key={item["navDisplayName"]}
              icon={item["icon"]}
              tooltipTitle={item["navDisplayName"]}
              onClick={() => handleClick(item["path"])}
            />
        ))}
      </SpeedDial>
  );
}

export default MySpeedDial;