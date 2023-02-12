import { ListItemText, ListItemButton, ListItemIcon, List} from '@mui/material';
import { Box, Grid } from '@mui/material';
import { useAppSelector } from '../../shared/hooks';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SvgIconComponent } from '@mui/icons-material'
import { MILK } from '../../shared/constant';

interface Props {
  name: string,
  icon: any,
  path: string,
  action?: any
}

const DrawerItem: React.FC<Props> = ({name, icon, path, action}) => {
  const currentPath: string = useAppSelector(state => state["path"]["value"]);

  return (
    <Link href={path}>
      <ListItemButton onClick={action} >
        <ListItemIcon sx={{ color: MILK }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} primaryTypographyProps={{variant: "darkbutton"}}/>
        {path == currentPath &&
          <ListItemIcon sx={{ color: MILK,  marginRight: -5}}>
            <ArrowBackIosIcon />
          </ListItemIcon>}
      </ListItemButton>
    </Link>
  );
}

export default DrawerItem;