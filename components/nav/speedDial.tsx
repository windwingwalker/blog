import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import NavigationTwoToneIcon from '@mui/icons-material/NavigationTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useRouter } from 'next/router'
import { PAGE_NAV_MAPPING, SAND } from '../../shared/constant';

const MySpeedDial: React.FC<{}> = () => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path);
  }

  return (
    <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16,  }}
        FabProps={{
          color: "jadeite",
          sx: {
          '&:hover': { bgcolor: 'jadeite.main' },
          bgcolor: 'jadeite.main',
          },
        }}
        icon={<SpeedDialIcon icon={<NavigationTwoToneIcon sx={{color: SAND}}/>} openIcon={<CloseTwoToneIcon sx={{color: SAND}}/>}/>}
      >
        {PAGE_NAV_MAPPING.filter((item) => item["visibility"] == "guest" || item["visibility"] == "both").map((item) => (
            <SpeedDialAction
              key={item["navDisplayName"]}
              icon={item["icon"]}
              slotProps={{ tooltip: { title: item["navDisplayName"] } }}
              onClick={() => handleClick(item["path"])}
            />
        ))}
      </SpeedDial>
  );
}

export default MySpeedDial;